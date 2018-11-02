/** combinando observables */
import { Subject, of, concat } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

console.log('\n FIRST usando mergeMap para cambiar el observable por otro diferente');
const subject_1 = new Subject();
of('one', 'two', 'three').pipe(
  mergeMap(() => subject_1)
).subscribe(value => console.log(`value is: ${value}`));

subject_1.next(1);
// value is: 1
// value is: 1
// value is: 1

console.log('\n SECOND concatenando observables');
const subject_2 = new Subject();
concat(
  of(1),
  subject_2,
  of(2)
).subscribe(value => console.log(`value is: ${value}`));
subject_2.next('valor concatenado 1');
subject_2.next('valor concatenado 2');
subject_2.complete();
// value is: 1
// value is: valor concatenado 1
// value is: valor concatenado 2
// value is: 2
