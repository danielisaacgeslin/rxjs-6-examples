// https://thinkster.io/tutorials/learn-rxjs-observables/subjects-observables-and-operators

// Observer
// You usually won't interact with the Observer object directly, as you'll likely interact with a Subject instead (which we cover below),
// but it's important to know what it does.
// Observers allow you to "push" new data into an observable sequence. You can think of this as a "Write-only" way of modifying
// observable sequences (to go back to our analogy of assembly lines, observers can only add new cars onto an assembly line).

// Observable
// An Observable is what we can use to listen, aka subscribe, to new changes that are emitted by an Observer.
// Think of this as a "Read-only" assembly line (you can only observe when new cars come off the assembly line).

// Subject
// A Subject is simply an Observer and Observable. You can push new values as well as subscribe to it.
// Think of this as a "Read & Write" assembly line (you can both add cars onto the assembly line and observe cars that come off the assembly line).

// Operators
// The purpose of Operators in RxJS are the same as most operators in other programming
// languages/libraries: they allow you to perform operations on your code.

// In RxJS, you can think of Operators as a way to manipulate the data coming from a Subject (or Observer) before it's sent to an Observable.
// This is the equivalent of instructing an assembly line to modify the car in a certain way (i.e. paint it black, shine it, etc) and
// then return it to the next assembly line.

/** observable sin rxjs */

const observable = {
  subscribe: (next: Function, error: Function, complete: Function) => {
    next(1);
    next(2);
    setTimeout(() => next(3), 1000);
    setTimeout(() => error(new Error('some error')), 2000);
    setTimeout(() => next(4), 3000);
    setTimeout(() => complete(), 4000);

  }
}

observable.subscribe(
  value => console.log(`value is: ${value}`),
  error => console.error(error),
  () => console.log('observable completed')
);

// value is: 1
// value is: 2
// value is: 3
// Error: some error
//     at Object.subscribe ...
// value is: 4
// observable completed