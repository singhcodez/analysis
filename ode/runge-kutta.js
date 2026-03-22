// rk4.js

/**
 * Solves an ODE using Runge-Kutta 4th Order.
 * Returns an array of step objects including all k-values.
 */
function solveRK4(f, x0, y0, targetX, h) {
    let steps = [];
    let x = x0;
    let y = y0;

    steps.push({ step: 0, x: x, y: y, k1: "-", k2: "-", k3: "-", k4: "-" });

    let iteration = 1;
    while (x < targetX - 1e-5) {
        let k1, k2, k3, k4;
        try {
            k1 = h * f(x, y);
            k2 = h * f(x + h/2, y + k1/2);
            k3 = h * f(x + h/2, y + k2/2);
            k4 = h * f(x + h, y + k3);
            
            if (isNaN(k1) || isNaN(k2) || isNaN(k3) || isNaN(k4)) throw new Error("Math Error");
        } catch (e) {
            return { error: `Math error at x = ${x.toFixed(4)}.` };
        }

        y = y + (1/6) * (k1 + 2*k2 + 2*k3 + k4);
        x = x + h;

        steps.push({
            step: iteration,
            x: parseFloat(x.toFixed(5)),
            y: parseFloat(y.toFixed(6)),
            k1: parseFloat(k1.toFixed(5)),
            k2: parseFloat(k2.toFixed(5)),
            k3: parseFloat(k3.toFixed(5)),
            k4: parseFloat(k4.toFixed(5))
        });

        iteration++;
        if (iteration > 10000) return { error: "Too many iterations." };
    }

    return { success: true, finalY: y, steps: steps };
}
