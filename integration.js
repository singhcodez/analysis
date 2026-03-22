// integration.js - Main Controller

document.getElementById('calculate-area-btn').addEventListener('click', () => {
    const xInput = document.getElementById('x-values').value;
    const yInput = document.getElementById('y-values').value;
    const selectedMethod = document.querySelector('input[name="integ-method"]:checked').value;
    const resultContainer = document.getElementById('integration-result');

    const x = xInput.split(',').map(val => parseFloat(val.trim()));
    const y = yInput.split(',').map(val => parseFloat(val.trim()));

    // Validation
    if (x.some(isNaN) || y.some(isNaN)) {
        resultContainer.innerHTML = `<p style="color:red; font-weight:bold;">Error: Invalid numbers.</p>`;
        return;
    }
    if (x.length !== y.length) {
        resultContainer.innerHTML = `<p style="color:red; font-weight:bold;">Error: X and Y counts must match.</p>`;
        return;
    }
    if (x.length < 2) {
        resultContainer.innerHTML = `<p style="color:red; font-weight:bold;">Error: Need at least 2 points to find an area.</p>`;
        return;
    }

    // Check equally spaced X values using the epsilon trick
    let h = x[1] - x[0];
    for (let i = 1; i < x.length - 1; i++) {
        if (Math.abs((x[i+1] - x[i]) - h) > 1e-5) {
            resultContainer.innerHTML = `<p style="color:red; font-weight:bold; padding:15px; background:#fee2e2; border-radius:6px;">Warning: Numerical Integration requires strictly equally spaced X values.</p>`;
            return;
        }
    }

    let n = x.length - 1; // Number of intervals
    let resultData;
    let methodName = "";
    let methodColor = "";

    let methodToRun = selectedMethod;

    // Auto-Select Logic
    if (selectedMethod === "auto") {
        if (n % 3 === 0) methodToRun = "simp38";
        else if (n % 2 === 0) methodToRun = "simp13";
        else methodToRun = "trap";
    }

    // Execute the appropriate module
    if (methodToRun === "trap") {
        resultData = solveTrapezoidal(y, h);
        methodName = selectedMethod === "auto" ? "Trapezoidal Rule (Auto-Selected)" : "Trapezoidal Rule";
        methodColor = "#3b82f6"; // Blue
    } else if (methodToRun === "simp13") {
        resultData = solveSimpson13(y, h);
        methodName = selectedMethod === "auto" ? "Simpson's 1/3 Rule (Auto-Selected)" : "Simpson's 1/3 Rule";
        methodColor = "#10b981"; // Green
    } else if (methodToRun === "simp38") {
        resultData = solveSimpson38(y, h);
        methodName = selectedMethod === "auto" ? "Simpson's 3/8 Rule (Auto-Selected)" : "Simpson's 3/8 Rule";
        methodColor = "#8b5cf6"; // Purple
    }

    // Render Output
    if (resultData.error) {
        resultContainer.innerHTML = `<p style="color:red; font-weight:bold; padding:15px; background:#fee2e2; border-radius:6px;">${resultData.error}</p>`;
    } else {
        resultContainer.innerHTML = `
            <div style="background: white; border: 2px solid ${methodColor}; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h3 style="color: ${methodColor}; margin-top: 0;">Area Result</h3>
                <p style="font-size: 1.1em; margin-bottom: 5px;">Using <strong>${methodName}</strong>:</p>
                <div style="display: flex; gap: 20px; color: var(--text-muted); margin-top: 10px;">
                    <span><strong>Intervals (n):</strong> ${n}</span>
                    <span><strong>Step Size (h):</strong> ${h.toFixed(4)}</span>
                </div>
                <div style="font-size: 2em; font-weight: bold; color: #0f172a; margin-top: 20px; text-align: center; background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px dashed ${methodColor};">
                    Area ≈ ${resultData.area.toFixed(5)}
                </div>
            </div>
        `;
    }
});
