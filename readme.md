# 🧮 Numerical Analysis MathLab
## ( in working )
A lightning-fast, client-side web application engineered to solve complex computational mathematics and numerical analysis problems. 

Originally developed as an interactive learning tool for students , this application goes beyond simple calculators. It is specifically designed to generate the **step-by-step data tables, iterations, and intermediate variables** that university and post-graduate students need to verify their manual exam calculations.

## ✨ Core Features

The MathLab is organized into four comprehensive mathematical modules:

### 🎯 Section A: Roots of Non-Linear Equations
Visualizes and calculates how curves cross zero using iterative bracketing and open methods.
* Bisection Method
* Newton-Raphson Method
* Secant Method
* Regular Falsi (False Position)

### 📈 Section B: Finite Differences & Interpolation
Calculates slopes and pinpoints missing data points from historical datasets.
* Newton's Forward & Backward Interpolation
* Stirling's Central Difference
* Lagrange's Interpolation

### 📐 Section C: Numerical Integration (Quadrature)
Computes the area under complex curves utilizing a custom dynamic equation parser.
* Trapezoidal Rule
* Simpson's 1/3 and 3/8 Rules
* Weddle's Rule
* Romberg Integration
* **Advanced Quadrature:** Gauss-Legendre (2 & 3 Point) and Gauss-Chebyshev First Kind (1, 2, & 3 Point Textbook Forms)

### 🚀 Section D: Ordinary Differential Equations (ODEs)
Traces the path of a curve using multi-step algorithms, given only its derivative ($dy/dx$) and an initial condition.
* Euler's Method
* Runge-Kutta 4th Order (RK4)
* Taylor Series Method (3rd Order via Numerical Central Differences)
* Picard's Method of Successive Approximations
* Milne's Predictor-Corrector (with automatic RK4 bootstrapping)

## 🛠️ Technical Architecture

This project is built for speed, accessibility, and mathematical precision without relying on heavy backend infrastructure.

* **Frontend:** HTML5, CSS3 (Custom responsive design)
* **Logic Engine:** Vanilla JavaScript (ES6+)
* **Zero Dependencies:** No external math libraries (like Math.js) or backend servers are used. All complex calculus, dynamic DOM manipulation, and math string parsing are handled natively in the browser.

## 🧠 Custom Math Parser
The application features a built-in JS math parser that translates standard textbook notation into executable code at runtime:
* Intelligently parses standard operators (`+`, `-`, `*`, `/`, `^`).
* Automatically maps `ln(x)` to Natural Log (Base $e$) and `log(x)` or `log10(x)` to Common Log (Base 10) to align with academic standards.
* Safely evaluates trigonometric and exponential functions (`sin`, `cos`, `exp`, `sqrt`).

## 🚀Run the App:

Simply open the index.html file in any modern web browser (Chrome, Firefox, Edge, Safari). No Node.js, Python, or local server environment is required.

[click here to use  ](https://analysishub.netlify
   app)

