// simpson38.js

/**
 * Calculates the area under a curve using Simpson's 3/8 Rule.
 * Requires the number of intervals (n) to be a MULTIPLE OF 3.
 */
function solveSimpson38(y, h) {
    let n = y.length - 1;
    
    // Safety check for Multiples of 3
    if (n % 3 !== 0) {
        return { error: "Simpson's 3/8 Rule requires intervals (n) to be a MULTIPLE OF 3." };
    }
    
    let sum = y[0] + y[n];
    
    for (let i = 1; i < n; i++) {
        if (i % 3 === 0) {
            sum += 2 * y[i]; // Multiples of 3 multiplied by 2
        } else {
            sum += 3 * y[i]; // Everything else multiplied by 3
        }
    }
    
    return { success: true, area: (3 * h / 8) * sum };
}
