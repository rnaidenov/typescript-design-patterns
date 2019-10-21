/**
 * *** SINGLETON PATTERN *** *
 * 
 * - Calculator object supplying a sole instance of itself
 * 
 * - Requirements:
 *   * Class with a private constructor, so it cannot be instantiated (***Calculator***)
 *   * Has a static instance variable === itself
 *   * Get method that returns the instance
 * 
 */


class Calculator {

    static instance = new Calculator();
    private value: number = 0;

    private constructor() { }


    static getInstance(): Calculator{
        return this.instance;
    }

    add(...numbers: number[]): Calculator{
        this.value = numbers.reduce((acc, val) => acc+val, this.value);
        return this;
    }

    subtract (...numbers: number[]): Calculator{
        this.value = numbers.reduce((acc, val) => acc - val, this.value);
        return this;
    }


    multiply (...numbers: number[]): Calculator{
        this.value = numbers.reduce((acc, val) => acc * val, this.value);
        return this;
    }


    divide (...numbers: number[]): Calculator{
        this.value = numbers.reduce((acc, val) => acc / val, this.value);
        return this;
    }


    getValue(): number {
        return this.value;
    }

}


console.log(Calculator.getInstance().add(12,5,3,20).subtract(10).multiply(2).divide(3).getValue());