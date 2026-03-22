// gausslegendre.js

/**
 * Calculates area using Gauss-Legendre Quadrature (2-point or 3-point).
 * Requires the raw function string and limits (a, b) rather than discrete data points.
 */
function solveGaussLegendre(funcStr, a, b, points) {
    // 1. Math Parser (Same as the one we built in the Equation Generator)
    const f = (targetX) => {
        let parsedFunc = funcStr
            .replace(/Math\./g, '')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/log/g, 'Math.log')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/\^/g, '**');
        
        let x = targetX; // Assign to 'x' so eval() can read it
        return eval(parsedFunc);
    };

    // 2. The Magic Numbers (Nodes/Roots and Weights)
    const nodes = {
        2: [-1 / Math.sqrt(3), 1 / Math.sqrt(3)],
        3: [-Math.sqrt(3/5), 0, Math.sqrt(3/5)]
    };
    
    const weights = {
        2: [1, 1],
        3: [5/9, 8/9, 5/9]
    };

    if (!nodes[points]) return { error: "Only 2-point and 3-point Gauss-Legendre are supported." };

    // 3. The Transformation Constants (Converting limits [a,b] to [-1,1])
    let c1 = (b - a) / 2;
    let c2 = (b + a) / 2;
    let sum = 0;

    // 4. Calculate the Integral
    for (let i = 0; i < points; i++) {
        let t = nodes[points][i];   // The magical X location (-1 to 1)
        let w = weights[points][i]; // The magical weight
        
        let actualX = c1 * t + c2;  // Translate 't' into the real world 'X'
        
        try {
            sum += w * f(actualX);
        } catch(e) {
            return { error: "Function evaluation failed. Check your equation syntax." };
        }
    }

    return { success: true, area: c1 * sum };
}
