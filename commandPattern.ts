/**
 * *** COMMAND PATTERN *** *
 * 
 * - Encapsulate a request's details into a single object
 * - Request can be queued for a delayed execution 
 * - It can be passed around as a parameter
 * 
 * - Requirements:
 *   * Interface with a single exectute() command (***Order***)
 *   * Concrete implementations of ^__interface (***TakeOrder / CookOrder***) 
 *   * Objects making use ot ^__ concrete implementations 
 * 
 */


interface CustomerRequirements {
    dishes: string[]
    dietary: string[],
}

interface Order {
    execute(): void
}


class TakeOrder implements Order {

    constructor(private cr: CustomerRequirements) { }

    execute(): void {
        const { dishes, dietary } = this.cr;
        const dishesList = dishes.reduce((acc, dish) => acc+=`* ${dish} \n`, '');
        const dietaryReqs = dietary.length  ? "They've got some dietary requirements. I'll make sure I put them down."
                                            : "They've no special dietary requiremetnts."

        console.log("Taking down customers' order. Their order is: ");
        console.log(dishesList);
        console.log(dietaryReqs);
    }

    getCQRs(){
        return this.cr;
    }

}



class CookOrder implements Order {

    constructor(private takeOrder: TakeOrder) { }

    execute(): void {
        const { dishes, dietary } = this.takeOrder.getCQRs();
        const dishesList = dishes.reduce((acc, dish) => acc += `* ${dish} \n`, '');
        const dietaryReqs = dietary.length ? "They've got some dietary requirements, need to be careful!"
            : "No special dietary requiremetnts, whew!"

        console.log("Time to get cracking. I'll need to cook: ");
        console.log(dishesList);
        console.log(`${dietaryReqs}\n\n`);
    }
}



class Waiter {

    private orders: Order[]

    constructor () { this.orders = [ ] };

    take(newOrder: Order) {
        newOrder.execute();
        console.log('Adding order to list ...');
        this.orders.push(newOrder)
    }


    getOrders(): Order[] {
        return this.orders;
    }

}

class Chef {

    cook(incomingOrder: Order) {
        incomingOrder.execute();
        console.log('Starting to cook ...');
    }

}



const waiter = new Waiter();
const chef = new Chef();

const customReqs1 = {
    dishes: ['Pepperoni pizza', 'Tzatziki', 'Angus steak'],
    dietary: ['Allergic to peanuts']
};

const customReqs2 = {
    dishes: ['Squid', 'Shellfish'],
    dietary: []
};


const customReqs3 = {
    dishes: ['Curry', 'More curry'],
    dietary: []
};

const orders = [customReqs1, customReqs2, customReqs3].map(cr => new TakeOrder(cr));

// Taking down orders / queueing down the order for the chef 
orders.forEach(order => waiter.take(order));

const cookOrders = waiter.getOrders().map(takeOrder => new CookOrder(<TakeOrder> takeOrder));

cookOrders.forEach(order => chef.cook(order));

    





