// simpson13.js

/**
 * Calculates the area under a curve using Simpson's 1/3 Rule.
 * Requires an EVEN number of intervals (n).
 */
function solveSimpson13(y, h) {
    let n = y.length - 1;
    
    // Safety check for Even Intervals
    if (n % 2 !== 0) {
        return { error: "Simpson's 1/3 Rule requires an EVEN number of intervals (n)." };
    }
    
    let sum = y[0] + y[n];
    
    for (let i = 1; i < n; i++) {
        if (i % 2 !== 0) {
            sum += 4 * y[i]; // Odd indexes multiplied by 4
        } else {
            sum += 2 * y[i]; // Even indexes multiplied by 2
        }
    }
    
    return { success: true, area: (h / 3) * sum };
}
