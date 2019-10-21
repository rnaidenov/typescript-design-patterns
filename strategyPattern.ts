/**
 * *** STRATEGY PATTERN *** *
 * 
 * - WineTaster object, whose behaviour changes depending on the chosen strategy 
 * - Different strategy --> alternative implementation for a piece of functionality
 * 
 * - Requirements:
 *   * 1 interface (***WineTaster***)
 *   * Multiple classes implementing it + supplying a definition for interface tasteWine() method
 *     (***AverageJoe / CoolJack / ExpertMark ***) 
 * 
 --> TODO: add logic in different tasteWine() algorithms ...
 */



interface TasteScore {
    value: number
}

interface Wine {
    name: string,
    price: number,
    quality: number
}


/**
 * Context Object
 * 
 * Define as an interface
 */
interface WineTaster {
    name: string,
    tasteWine(wine: Wine): TasteScore 
}



/**
 * StrategyObject #1
 * 
 * Implement Context object
 */
class AverageJoe implements WineTaster {
    private expertise: number

    constructor (public name: string) {
        this.expertise = 2;
    }

    tasteWine({ name, price, quality }): TasteScore {
        const value  = Math.ceil((quality * this.expertise * 3 / price * 10));
        return { value };
    }
}



/**
 * StrategyObject #2
 * 
 * Implement Context object
 */
class CoolJack implements WineTaster {

    private expertise: number

    constructor (public name: string) {
        this.expertise = 6; 
    }

    tasteWine({ name, price, quality}): TasteScore {
        const value  = Math.ceil((quality * this.expertise * 45 / (price / 50) ) / 100);
        return { value };
    }
}


/**
 * StrategyObject #3
 * 
 * Implement Context object
 */
class ExpertMark implements WineTaster {
    private expertise: number

    constructor (public name: string) {
        this.expertise = 10;
    }

    tasteWine({ name, price, quality }): TasteScore {
        const value  = Math.ceil(((quality * this.expertise * 3) * (price * 10)) / 100);
        return { value };
    }
}



const joe = new AverageJoe('Joe');
const jack = new CoolJack('Jack');
const mark = new ExpertMark('Mark');

const peepz = [joe, jack, mark];

const badWine = { name: 'Very bad wine', price: 2, quality: 0.3 };
const decentWine = { name: 'Average wine', price: 6, quality: 0.58 };
const amazingWine = { name: 'High quality wine', price: 12, quality: 0.8 };

const wines = [badWine, decentWine, amazingWine];

const howGoodIsWine = (wine) => {
    peepz.forEach(person => {
        console.log(`${person.name}'s score for ${wine.name} is ${person.tasteWine(wine).value}`);
    });
}

wines.forEach(wine => howGoodIsWine(wine))






