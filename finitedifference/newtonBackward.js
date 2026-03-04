// newtonbackward.js

/**
 * Calculates the expanding p term for Backward Interpolation: p(p+1)(p+2)...
 * Notice the PLUS sign compared to the Forward method!
 */
function calculatePBackward(p, n) {
    let temp = p;
    for (let i = 1; i < n; i++) {
        temp *= (p + i); 
    }
    return temp;
}

/**
 * Solves Newton's Backward Interpolation
 * @param {Array<number>} x - The array of X values
 * @param {Array<number>} y - The array of Y values
 * @param {Array<Array<number>>} diffTable - The pre-calculated finite difference table
 * @param {number} targetX - The X value we want to interpolate
 */
function solveNewtonBackward(x, y, diffTable, targetX) {
    let n = y.length;
    let h = x[1] - x[0];
    
    // Safety Check: Verify X values are equally spaced
    for(let i = 1; i < x.length - 1; i++) {
        if(Math.abs((x[i+1] - x[i]) - h) > 1e-5) {
            return { error: "Newton's Backward Method requires X values to be equally spaced." };
        }
    }

    // Calculate p using the LAST x value (x_n)
    let p = (targetX - x[n - 1]) / h; 
    
    // Start with the LAST y value (y_n)
    let finalY = diffTable[n - 1][0]; 

    // Apply the formula using the bottom diagonal (Backward differences)
    for (let i = 1; i < n; i++) {
        // This tricky index grabs the orange numbers from the bottom edge of our grid!
        let nablaY = diffTable[n - 1 - i][i]; 
        finalY += (calculatePBackward(p, i) * nablaY) / factorial(i);
    }

    return { 
        success: true, 
        h: h, 
        p: p, 
        result: finalY 
    };
}
