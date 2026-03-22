// picard.js

/**
 * Solves an ODE using a Numerical Approximation of Picard's Method.
 * Evaluates the successive integrals using the Trapezoidal rule.
 */
function solvePicard(f, x0, y0, targetX) {
    let maxIter = 5; // Textbooks usually stop at 3 or 4 iterations
    let slices = 100; // Divide the path into 100 tiny pieces for integration
    let h = (targetX - x0) / slices;
    
    // Create the X path
    let xArr = [];
    for (let i = 0; i <= slices; i++) {
        xArr.push(x0 + i * h);
    }

    // Y^(0) is just the initial y0 everywhere
    let yOld = new Array(slices + 1).fill(y0);
    let yNew = new Array(slices + 1).fill(y0);
    
    let steps = [];

    // Run the Picard Iterations
    for (let iter = 1; iter <= maxIter; iter++) {
        yNew[0] = y0; // The starting point never changes
        
        // Cumulative Trapezoidal Integration for this iteration
        for (let i = 1; i <= slices; i++) {
            try {
                let fx1 = f(xArr[i-1], yOld[i-1]);
                let fx2 = f(xArr[i], yOld[i]);
                
                if (isNaN(fx1) || isNaN(fx2)) throw new Error("Math Error");
                
                // y_new(x) = y_new(x-h) + Area of the trapezoid
                yNew[i] = yNew[i-1] + (h / 2) * (fx1 + fx2);
            } catch (e) {
                return { error: `Math error during Picard iteration ${iter}. Check equation syntax.` };
            }
        }
        
        // Save the result at the Target X for the UI table
        steps.push({
            iteration: iter,
            y_approx: parseFloat(yNew[slices].toFixed(6))
        });
        
        // Copy the new curve to be the old curve for the next round
        yOld = [...yNew];
    }

    return { success: true, finalY: yNew[slices], steps: steps };
}
