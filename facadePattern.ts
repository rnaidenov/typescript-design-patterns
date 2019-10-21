/**
 * *** FACADE PATTERN *** *
 * 
 * - Encapsulates several interfaces into a single class
 * - Removes the need for multiple server calls to different services
 * 
 * - Requirements:
 *   * Multiple classes (***FlightSearchService /  HotelBookingService***)
 *   * Facade object, which is responsible for delegating the call to the relevant service
 *     (***HolidayBooker***)
 */


class FlightSearchService {

    lookUp(from: string, to: string, numPeople: number, isReturn: boolean, date: Date): number{
        console.log(`Looking for a ${isReturn ? 'return' : 'one-way' } flight for ${numPeople} between ${from} and ${to} for ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
        return Math.floor(Math.random() * 100);
    }

}


class HotelBookingService {

    lookUp(from: string, to: string, numPeople: number, date: Date): number{
        console.log(`Looking for a hotel room for ${numPeople} in ${to} for ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
        return Math.floor(Math.random() * 200);
    }

}


// Facade
class HolidayBooker {
    search(from: string, to: string, numPeople: number, isReturn: boolean, date: Date): number{
        const flightPrice = new FlightSearchService().lookUp(from, to, numPeople, isReturn, date);
        const hotelPrice = new HotelBookingService().lookUp(from, to, numPeople, date);

        const totalPrice = flightPrice + hotelPrice;
        console.log(`Total price for holiday is: £${totalPrice}`);
        return totalPrice;
    }
}   



new HolidayBooker().search('Sofia', 'Berlin', 2, true, new Date('15 December 2019'));
