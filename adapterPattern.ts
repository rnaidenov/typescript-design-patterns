/**
 * *** ADAPTER PATTERN *** *
 * 
 * - Allows us to work with incompatible interfaces
 * - Convert the interface of one class to interface that client expects
 * 
 *   e.g.  old API interface ---> new API interface
 * 
 * - Requirements:
 *   * Basic interface (***CalculatorInterface***)
 *   * Concrete implementation of basic interface (***OldCalculator***) 
 *   * Other class, whose interface is incompatible with ^ above (***NewCalculator***) 
 *   * Adapter object to implement basic interface with ^ class's functionality
 * 
 */




interface CalculatorInterface {
    calc(num1: number, num2: number, operation: string): number
}

module Operations {
    export const ADD = 'addition';
    export const SUBTRACT = 'subtraction';
    export const MULTIPLY = 'multiplication';
    export const DIVIDE = 'division';
}

class OldCalculator implements CalculatorInterface {

    calc(num1: number, num2: number, operation: string): number {
        switch (operation) {

            case Operations.ADD:
                return num1 + num2;

            case Operations.SUBTRACT:
                return num1 - num2;

            case Operations.MULTIPLY:
                return num1 * num2;

            case Operations.DIVIDE:
                return num1 / num2;
        }
    }

}


class NewCalculator {

    add(num1, num2) {
        return num1 + num2;
    }

    subtract(num1, num2) {
        return num1 - num2;
    }

    multiply(num1, num2) {
        return num1 * num2;
    }

    divide(num1, num2) {
        return num1 / num2;
    }

}



class CalculatorAdapter implements CalculatorInterface {

    constructor(private calculator: NewCalculator) { }

    calc(num1, num2, operation): number {

        switch (operation) {

            case Operations.ADD:
                return this.calculator.add(num1, num2);

            case Operations.SUBTRACT:
                return this.calculator.subtract(num1, num2);


            case Operations.MULTIPLY:
                return this.calculator.multiply(num1, num2);

            case Operations.DIVIDE:
                return this.calculator.divide(num1, num2);
        }
    }

}


const oldCalc = new OldCalculator();
const newCalc = new NewCalculator();
const calcAdapter = new CalculatorAdapter(newCalc);

console.log(oldCalc.calc(1, 1, Operations.ADD));
console.log(calcAdapter.calc(1, 1, Operations.ADD));

