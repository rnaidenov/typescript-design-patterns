/**
 * *** DECORATOR PATTERN *** *
 * 
 * - Enables us to extend an object's functionality in run-time 
 * 
 * - Requirements:
 *   * Component interface (***Hero***)
 *   * Basic implementation of the component interface (***BasicHero***)
 *   * Decorator object implementing the interface (***HeroDecorator***)
 *     ^ ___ takes a Hero object in its constructor 
 *  
 *   * Concrete objects extending the decorator (***FlyingHero***)
 * 
 */


interface Hero {
    showUp(): void
}


// Base component
class BasicHero implements Hero {

    private specialAbilities: string;
    
    constructor() {
        this.specialAbilities = 'a cape';
    }

    showUp(){
        console.log(`I'm a basic super hero. I have ${this.specialAbilities}!`);
    }
}


// Decorator
class HeroDecorator implements Hero {


    constructor(private hero: Hero) { }

    showUp(){
        this.hero.showUp();
    }

} 


// Concrete decorators
class FlyingSuperhero extends HeroDecorator {

    private specialAbilities: string;

    constructor(hero: Hero){
        super(hero);
        this.specialAbilities = 'fly';
    }
    
    showUp(){
        super.showUp();
        console.log(`Also, I can ${this.specialAbilities}!`);        
    }
}


// Concrete decorator
class LaserSuperhero extends HeroDecorator {

    private specialAbilities: string;

    constructor(hero: Hero){
        super(hero);
        this.specialAbilities = 'shoot lasers from my eyes';
    }
    
    showUp(){
        super.showUp();
        console.log(`Oh, and BTW, I'm so cool that I can ${this.specialAbilities}.`);
    }
}



const flyingLaserHero = new LaserSuperhero
                            (new FlyingSuperhero
                                (new BasicHero()));


flyingLaserHero.showUp();
