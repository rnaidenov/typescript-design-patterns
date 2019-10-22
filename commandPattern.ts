/**
 * *** COMMAND PATTERN *** *
 * 
 * - Encapsulate a request's details into a single object
 * - Request can be queued for a delayed execution 
 * - It can be passed around as a parameter
 * 
 * - Requirements:
 *   * Interface with a single exectute() command (***Command***)
 *   * Concrete implementations of ^__interface (***TakeOrder / CookOrder***) 
 *   * Objects making use ot ^__ concrete implementations 
 * 
 */


interface CustomerRequirements {
    dishes: string[]
    dietary: string[],
}


interface Command {
    execute(): any
}


abstract class Order implements Command {
    constructor(protected customerReqs: CustomerRequirements) {}

    abstract execute(): any

    getCustomerReqs(): CustomerRequirements {
        return this.customerReqs;
    }
}




class TakeOrder extends Order {

    constructor(cr: CustomerRequirements) { super(cr); }

    execute(): CookOrder {
        const { dishes, dietary } = this.customerReqs;
        const dishesList = dishes.reduce((acc, dish) => acc+=`* ${dish} \n`, '');
        const dietaryReqs = dietary.length  ? "They've got some dietary requirements. I'll make sure I put them down."
                                            : "They've no special dietary requiremetnts."

        console.log("Taking down customers' order. Their order is: ");
        console.log(dishesList);
        console.log(dietaryReqs);
        return new CookOrder(this);
    }

}



class CookOrder extends Order {

    constructor(order: Order) { super(order.getCustomerReqs()); }

    execute(): void {
        const { dishes, dietary } = this.customerReqs;
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

    
    take(customerReqs: CustomerRequirements) {
        const newOrder = new TakeOrder(customerReqs);
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
        console.log('Starting to cook ... \n\n');
    }

}



class Restaurant {

    private chef: Chef; 
    private waiter: Waiter;


    constructor(chef, waiter){
        this.chef = chef;
        this.waiter = waiter;
    }


    // Taking down orders / queueing down the order for the chef 
    takeDownOrders(customerReqs: CustomerRequirements[]){
        customerReqs.forEach(reqs => this.waiter.take(reqs));
    }


    cookOrders(){
        waiter.getOrders().forEach(order => {
            this.chef.cook(order);
        })
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



const customerReqs = [customReqs1, customReqs2, customReqs3];

const fancyPlace = new Restaurant(chef, waiter);
fancyPlace.takeDownOrders(customerReqs);
fancyPlace.cookOrders();