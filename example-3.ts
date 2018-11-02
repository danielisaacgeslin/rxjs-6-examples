/** of (observable) CON rxjs */
import { of } from 'rxjs';

console.log('\n FIRST emitiendo multiples valores');
of(1, 2, 3, 4).subscribe(
  value => console.log(`value is: ${value}`),
  null,
  () => console.log('observable completed')
);
// value is: 1
// value is: 2
// value is: 3
// value is: 4
// observable completed

console.log('\n SECOND emitiendo 1 valor');
of('a').subscribe(
  value => console.log(`value is: ${value}`),
  null,
  () => console.log('observable completed')
);
// value is: a
// observable completed

console.log('\n THIRD emitiendo 1 valor sin callback de complete');
of('hi').
  subscribe(value => console.log(`value is: ${value}`));
// value is: hi