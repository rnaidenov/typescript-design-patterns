/**
 * *** OBSERVER PATTERN *** *
 * 
 * - Subscription model maintaining a one-to-many relationship between a 
 *   a subject and its observers
 * - Whenever the subject's state changes, the observers are notified
 * 
 * - Requirements: 
 *    
 *   * Subject, whose state will be monitored (***BeingLateSubject***)
 *   * Observer interface (***Observer***)
 *   * Classes implementing the Observer interface 
 *     Each takes the subject as an argument in their constructors (***DarkJokeObserver / PunJokeObserver***)
 * 
 */



interface Observer {
    update(): any
}
 




// Tells a dark joke when it gets notified about a state update
class DarkJokeObserver implements Observer {

    private jokes: string[]
    private count: number


    constructor(private subject: BeingLateSubject) {
        this.jokes = ['Super Dark Joke 1', 'Awfully Dark Joke 2', 'Hideously Dark Joke 3']
        this.count = 0;
        subject.attatch(this);
    }


    update(): void {
        console.log("Dark Joke Observer detected an update!\nHere's your latest joke:\n");
        console.log(this.jokes[this.count]+"\n\n\n");
        ++this.count;
    }

}



class PunJokeObserver implements Observer {

    private jokes: string[]
    private count: number


    constructor(private subject: BeingLateSubject) {
        this.jokes = ['Stupid Pun 1', 'Dumb dumb Pun Joke 2', 'Miserably stupid pun 3'];
        this.count = 0;
        subject.attatch(this);
    }


    update(): void {
        console.log("Pun Joke Observer detected an update!\nHere's your latest joke:\n");

        console.log(this.jokes[this.count]+"\n\n\n");
        ++this.count;
    }

}



class BeingLateSubject {


    private listObservers: Observer[]

    constructor(private state: number) {
        this.listObservers = [];
    }

    public getState() {
        return this.state;
    }

    public setState(state: number): void {
        console.log('\n!---- !STATE UPDATE! ----!\n');
        this.state = state;
        this.notifyAllObservers();
    }


    public attatch(obs: Observer): void {
        this.listObservers.push(obs);
    }


    public notifyAllObservers(): void {
        for (let obs of this.listObservers) {
            obs.update();
        }
    }

}

const lateSubject = new BeingLateSubject(419);
const darkJokeObserver = new DarkJokeObserver(lateSubject);
const punJokeObserver = new PunJokeObserver(lateSubject);


lateSubject.setState(418);
lateSubject.setState(426546);
lateSubject.setState(420);


