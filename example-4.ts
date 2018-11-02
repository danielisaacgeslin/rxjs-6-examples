/** of (observable) con operadores */
import { of } from 'rxjs';
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