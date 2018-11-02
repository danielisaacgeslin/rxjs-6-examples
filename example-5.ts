/** Subject */
import { Subject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

console.log('\n FIRST subscribiendo antes de la primera emision');
const subject_1 = new Subject();
subject_1.subscribe(value => console.log(`value is: ${value}`));
subject_1.next(1);
subject_1.next(2);
// value is: 1
// value is: 2

console.log('\n SECOND subscribiendo despues de que se empezaron a emitir valores');
const subject_2 = new Subject();
subject_2.next(1);
subject_2.subscribe(value => console.log(`value is: ${value}`));
subject_2.next(2);
subject_2.next(3);
// value is: 2
// value is: 3


console.log('\n THIRD completando');
const subject_3 = new Subject();
subject_3.subscribe(value => console.log(`value is: ${value}`));
subject_3.next(1);
subject_3.next(2);
subject_3.complete();
subject_3.next(3);
// value is: 1
// value is: 2


console.log('\n FOURTH usando operadores');
const subject_4 = new Subject<number>();
subject_4.pipe(
  map(value => value + 10),
  finalize(() => console.log('finalize escribiendo un log cuando el observable esta completo'))
).subscribe(value => console.log(`value is: ${value}`));
subject_4.next(1);
subject_4.next(2);
subject_4.complete();

// value is: 11
// value is: 12
// finalize escribiendo un log cuando el observable esta completo
