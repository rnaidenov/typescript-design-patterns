/**
 * *** FACTORY PATTERN *** *
 * 
 * - Allows the creation of specific types based on some logic
 * - Instead of having the parent class instantiate objects 
 *   this responsibility is delegated to a Factory class which
 *   does so by following some internal logic sequence 
 * 
 * - Requirements:
 *   * Factory for creating diff. instances of an object (***GraduateFactory***)
 *     ^__ has static method that takes in params, 
 *         which will make up what type of object we want to create
 * 
 *   * Factory object(s)  (***ScrupolousGraduate / UnscrupolousGraduate***)
 *     ^__ decide what type of Joke is instantiated (***DarkJoke / PunJoke***)
 * 
 */


namespace HUMOUR_TYPE {
    export const DARK = 'too racist jokes';
    export const PUN = 'heavy pun jokes';
}

interface Joke {
    getJoke(): string,
} 


class DarkJoke implements Joke {

    private darkJokes: string[];

    constructor() {
        this.darkJokes = ['Dark Joke #1', 'Dark Joke #2', 'Dark Joke #3', 'Dark Joke #4'];
    }

    getJoke(): string{
        const randomIdx = Math.floor(Math.random() * this.darkJokes.length);
        return this.darkJokes[randomIdx];
    }

}


class PunJoke implements Joke {

    private punJokes: string[];

    constructor() {
        this.punJokes = ['Pun Joke #1', 'Pun Joke #2', 'Pun Joke #3', 'Pun Joke #4'];
    }

    getJoke(): string{
        const randomIdx = Math.floor(Math.random() * this.punJokes.length);
        return this.punJokes[randomIdx];
    }

}


class GraduateFactory {
    static create (name: string, humourType: string) {
        if (humourType === HUMOUR_TYPE.DARK) {
            return new UnscrupulousGrad(name);
        } else if (humourType === HUMOUR_TYPE.PUN) {
            return new ScrupulousGrad(name);
        }
    }    
}


class Graduate {

    private joke: string

    constructor(private name: string) {}

    sayJoke(): void {
        console.log(`${this.name}: ${this.joke}`);
    }


    thinkOfJoke(joke: string): void {
        this.joke = joke;
    }
}

class UnscrupulousGrad extends Graduate {

    constructor(name: string){
        super(name);
        this.thinkOfJoke(new DarkJoke().getJoke());
    }

}


class ScrupulousGrad extends Graduate {

    constructor(name: string){
        super(name);
        this.thinkOfJoke(new PunJoke().getJoke());
    }
    
}


const bart = GraduateFactory.create('Bart', HUMOUR_TYPE.DARK);
const sammy = GraduateFactory.create('Sammy', HUMOUR_TYPE.PUN);


bart.sayJoke();
sammy.sayJoke();