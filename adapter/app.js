const Calculator = require('./Calculator')
const CalculatorAdapter = require('./CalculatorAdapter')

//Adapter
const calcAdapter = new CalculatorAdapter();
const sumAdapter = calcAdapter.operation(2, 2, "multiplication");
console.log(sumAdapter); //output 4

//Calculator
const calculator = new Calculator();
const sum = calculator.mult(2, 2);
console.log(sum); //output 4