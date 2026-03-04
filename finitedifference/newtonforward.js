// newtonforward.js

/**
 * Calculates the factorial of a number (n!)
 */
function factorial(n) {
    let f = 1;
    for (let i = 2; i <= n; i++) f *= i;
    return f;
}

/**
 * Calculates the expanding p term for Forward Interpolation: p(p-1)(p-2)...
 */
function calculatePForward(p, n) {
    let temp = p;
    for (let i = 1; i < n; i++) {
        temp *= (p - i);
    }
    return temp;
}

/**
 * Solves Newton's Forward Interpolation
 * @param {Array<number>} x - The array of X values
 * @param {Array<number>} y - The array of Y values
 * @param {Array<Array<number>>} diffTable - The pre-calculated finite difference table
 * @param {number} targetX - The X value we want to interpolate
 */
function solveNewtonForward(x, y, diffTable, targetX) {
    let n = y.length;
    let h = x[1] - x[0];
    
    // Safety Check: Verify X values are equally spaced
    for(let i = 1; i < x.length - 1; i++) {
        if(Math.abs((x[i+1] - x[i]) - h) > 1e-5) {
            return { error: "Newton's Forward Method requires X values to be equally spaced." };
        }
    }

    // Calculate p: (x - x0) / h
    let p = (targetX - x[0]) / h;
    
    // Start with y0
    let finalY = diffTable[0][0]; 

    // Apply the formula using the top diagonal (Forward differences)
    for (let i = 1; i < n; i++) {
        let deltaY = diffTable[0][i]; // Grabs the blue numbers!
        finalY += (calculatePForward(p, i) * deltaY) / factorial(i);
    }

    return { 
        success: true, 
        h: h, 
        p: p, 
        result: finalY 
    };
}
