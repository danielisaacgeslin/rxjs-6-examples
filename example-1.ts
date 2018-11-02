// https://thinkster.io/tutorials/learn-rxjs-observables/subjects-observables-and-operators

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