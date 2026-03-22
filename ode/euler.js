// euler.js

/**
 * Solves an ODE using Euler's Method.
 * Returns an array of step objects for the UI table.
 */
function solveEuler(f, x0, y0, targetX, h) {
    let steps = [];
    let x = x0;
    let y = y0;
    
    // Record the initial starting point
    steps.push({ step: 0, x: x, y: y, slope: "N/A", dy: "N/A" });

    let iteration = 1;
    // We use a small epsilon (1e-5) to prevent floating-point rounding errors from stopping the loop early
    while (x < targetX - 1e-5) {
        let slope;
        try {
            slope = f(x, y);
            if (isNaN(slope) || !isFinite(slope)) throw new Error("Math Error");
        } catch (e) {
            return { error: `Math error at x = ${x.toFixed(4)}. Check for division by zero.` };
        }

        let dy = h * slope;
        y = y + dy;
        x = x + h;

        steps.push({
            step: iteration,
            x: parseFloat(x.toFixed(5)),
            y: parseFloat(y.toFixed(6)),
            slope: parseFloat(slope.toFixed(6)),
            dy: parseFloat(dy.toFixed(6))
        });
        
        iteration++;
        
        // Safety break to prevent infinite loops if student enters a tiny 'h' by mistake
        if (iteration > 10000) return { error: "Too many iterations. Is your step size (h) too small?" };
    }

    return { success: true, finalY: y, steps: steps };
}
