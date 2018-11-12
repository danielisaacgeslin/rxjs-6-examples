/** of (observable) con operadores */
import { of, Observable, Subject } from 'rxjs';
import { map, filter, distinct } from 'rxjs/operators';

console.log('\n FIRST map');
of(1, 2).pipe(
  map(value => value + 10)
).subscribe(value => console.log(`value is: ${value}`));
// value is: 11
// value is: 12

console.log('\n SECOND filter');
of(1, 2, 3, 4, 5, 6).pipe(
  filter(value => value >= 4)
).subscribe(value => console.log(`value is: ${value}`));
// value is: 4
// value is: 5
// value is: 6

console.log('\n THIRD distinct');
of(1, 1, 1, 1, 1, 2, 2, 1).pipe(
  distinct()
).subscribe(value => console.log(`value is: ${value}`));
// value is: 1
// value is: 2

console.log('\n FOURTH distinct > filter > map');
of(1, 2, 3, 4, 1, 2, 1, 3, 4, 1, 5, 2, 6, 3, 4, 5, 7, 1, 1, 1, 1, 1).pipe(
  distinct(),
  filter(value => value >= 4),
  map(value => value + 10)
).subscribe(value => console.log(`value is: ${value}`));
// value is: 14
// value is: 15
// value is: 16
// value is: 17

console.log('\n FOURTH custom operator');
/** add returns a function that returns a function that returns an observable */
const add = (numberToAdd: number) => (source: Observable<number>) => (
  /** creating a new observable with a custom subscribe function */
  new Observable(subscriber => {
    const subscription = source.subscribe({
      next: value => subscriber.next(value + numberToAdd),
      error: e => subscriber.error(e),
      complete: () => subscriber.complete()
    });
    return subscription;
  })
);
of(1, 2, 3).pipe(
  add(10), // 1 + 10...then 2 + 10...then 3 + 10
  add(20) // 11 + 20...then 12 + 20...then 13 + 20
).subscribe(value => console.log(`value is: ${value}`));
// value is: 31
// value is: 32
// value is: 33


console.log('\n FIFTH custom operator 2');
/** add returns a function that returns a function that returns an observable */
const add2 = (numberToAdd: number) => (source: Observable<number>) => source.pipe(map(value => value + numberToAdd));
of(1, 2, 3).pipe(
  add2(10), // 1 + 10...then 2 + 10...then 3 + 10
  add2(20) // 11 + 20...then 12 + 20...then 13 + 20
).subscribe(value => console.log(`value is: ${value}`));
// value is: 31
// value is: 32
// value is: 33
