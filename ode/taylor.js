// taylor.js

/**
 * Solves an ODE using a 3rd-Order Taylor Series Method.
 * Uses numerical central differences to calculate y'' and y''' dynamically.
 */
function solveTaylor(f, x0, y0, targetX, h) {
    let steps = [];
    let x = x0;
    let y = y0;
    let delta = 0.00001; // Microscopic step for numerical differentiation

    // Helper function to find y'' (Second Derivative)
    function getDeriv2(currX, currY, yPrime) {
        let forward = f(currX + delta, currY + delta * yPrime);
        let backward = f(currX - delta, currY - delta * yPrime);
        return (forward - backward) / (2 * delta);
    }

    // Helper function to find y''' (Third Derivative)
    function getDeriv3(currX, currY, yPrime) {
        let yPrimeForward = f(currX + delta, currY + delta * yPrime);
        let yPrimeBackward = f(currX - delta, currY - delta * yPrime);
        
        let d2Forward = getDeriv2(currX + delta, currY + delta * yPrime, yPrimeForward);
        let d2Backward = getDeriv2(currX - delta, currY - delta * yPrime, yPrimeBackward);
        
        return (d2Forward - d2Backward) / (2 * delta);
    }

    steps.push({ step: 0, x: x, y: y, y1: "-", y2: "-", y3: "-" });

    let iteration = 1;
    while (x < targetX - 1e-5) {
        let y1, y2, y3;
        
        try {
            // 1st Derivative y'
            y1 = f(x, y);
            // 2nd Derivative y''
            y2 = getDeriv2(x, y, y1);
            // 3rd Derivative y'''
            y3 = getDeriv3(x, y, y1);
            
            if (isNaN(y1) || isNaN(y2) || isNaN(y3)) throw new Error("Math Error");
        } catch (e) {
            return { error: `Math error at x = ${x.toFixed(4)}. Function blew up.` };
        }

        // 3rd-Order Taylor Series Formula!
        y = y + (h * y1) + ((h * h) / 2) * y2 + ((h * h * h) / 6) * y3;
        x = x + h;

        steps.push({
            step: iteration,
            x: parseFloat(x.toFixed(5)),
            y: parseFloat(y.toFixed(6)),
            y1: parseFloat(y1.toFixed(5)),
            y2: parseFloat(y2.toFixed(5)),
            y3: parseFloat(y3.toFixed(5))
        });

        iteration++;
        if (iteration > 10000) return { error: "Too many iterations." };
    }

    return { success: true, finalY: y, steps: steps };
}
