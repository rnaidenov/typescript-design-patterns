/**
 * *** FACTORY PATTERN *** *
 * 
 * - Allows the creation of specific types based on some logic
 * - Instead of having the parent class instantiate objects 
 *   this responsibility is delegated to a Factory class which
 *   does so by following some internal logic sequence 
 * 
 * - Requirements:
 *   * Common Factory interface (***Graduate***)
 *   * Factory object(s)  (***ScrupolousGraduate / UnscrupolousGraduate***)
 *   * ^__ decide what type of Joke is instantiated (***DarkJoke / PunJoke***)
 * 
 */


interface Joke {
    getJoke(): string,
} 


class DarkJoke implements Joke {

    private type: string;
    private value: string;

    constructor() {
        this.type = 'Dark Joke';
        this.value = '*too racist joke*';
    }

    getJoke(): string{
        return this.value;
    }

}


class PunJoke implements Joke {
    private type: string;
    private value: string;

    constructor() {
        this.type = 'Pun Joke';
        this.value = '*heavy pun joke*';
    }
    
   
    getJoke(): string {
        return this.value;
    }
}



class Graduate {
    protected joke: string;

    constructor(private name: string) { }

    sayJoke(): void {
        console.log(`${this.name}: ${this.joke}`);
    }

}


class UnscrupulousGrad extends Graduate {

    constructor(name: string){
        super(name);
        this.joke = new DarkJoke().getJoke();
    }

}

class ScrupulousGrad extends Graduate {

    constructor(name: string){
        super(name)
        this.joke = new PunJoke().getJoke();
    }

}



const bart = new UnscrupulousGrad('Bart');
const sammy = new ScrupulousGrad('Sammy');

bart.sayJoke();
sammy.sayJoke();