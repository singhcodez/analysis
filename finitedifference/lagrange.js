// lagrange.js

/**
 * Solves Lagrange's Interpolation for equally OR unequally spaced data.
 * Does NOT require a difference table, h, or p.
 */
function solveLagrange(x, y, targetX) {
    let n = x.length;
    let finalY = 0;

    // Loop through every data point
    for (let i = 0; i < n; i++) {
        let term = y[i]; // Start with y_i
        
        // Multiply by the large fractional weight
        for (let j = 0; j < n; j++) {
            if (j !== i) { // Skip when j equals i to avoid dividing by zero!
                term = term * (targetX - x[j]) / (x[i] - x[j]);
            }
        }
        
        // Add this term to the total sum
        finalY += term;
    }

    // We return a special flag (isLagrange) so our UI knows not to try and print 'h' or 'p'
    return { 
        success: true, 
        isLagrange: true, 
        result: finalY 
    };
}
