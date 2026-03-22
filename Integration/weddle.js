// weddle.js

/**
 * Calculates area using Weddle's Rule.
 * Requires the number of intervals (n) to be a MULTIPLE OF 6.
 */
function solveWeddle(y, h) {
    let n = y.length - 1;
    
    // Safety check for Multiples of 6
    if (n % 6 !== 0) {
        return { error: "Weddle's Rule requires the number of intervals (n) to be a MULTIPLE OF 6." };
    }
    
    let sum = y[0] + y[n]; // First and Last get a weight of 1
    
    for (let i = 1; i < n; i++) {
        if (i % 6 === 0) {
            sum += 2 * y[i]; // Indices like 6, 12 get multiplied by 2
        } else if (i % 6 === 3) {
            sum += 6 * y[i]; // Indices like 3, 9 get multiplied by 6
        } else if (i % 2 === 0) {
            sum += 1 * y[i]; // Remaining Even indices (2, 4, 8, 10) get multiplied by 1
        } else {
            sum += 5 * y[i]; // Remaining Odd indices (1, 5, 7, 11) get multiplied by 5
        }
    }
    
    // The Weddle Multiplier: 3h / 10
    return { success: true, area: (3 * h / 10) * sum };
}
