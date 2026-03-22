// trapezoidal.js

/**
 * Calculates the area under a curve using the Trapezoidal Rule.
 * Works for any number of intervals.
 */
function solveTrapezoidal(y, h) {
    let n = y.length - 1; // Number of intervals
    let sum = y[0] + y[n]; // First + Last
    
    for (let i = 1; i < n; i++) {
        sum += 2 * y[i]; // Multiply middle terms by 2
    }
    
    return { success: true, area: (h / 2) * sum };
}
