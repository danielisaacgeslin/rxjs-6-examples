/** from */
import { from } from 'rxjs';
import { map, mergeMap, delay } from 'rxjs/operators';

console.log('\n FIRST conviertiendo un array en observable');
const array_1 = [1, 2, 3];
from(array_1)
  .subscribe(value => console.log(`value is: ${value}`));
// value is: 1
// value is: 2
// value is: 3

console.log('\n SECOND conviertiendo una promise en observable');
const promise_1 = Promise.resolve('hello');
from(promise_1).subscribe(
  value => console.log(`value is: ${value}`),
  null,
  () => console.log('promesa resuelta y observable completo')
);
// value is: hello
// promesa resuelta y observable completo

setTimeout(() => {
  console.log('\n THIRD combinando promises y arrays en flujos');
  const promise_2 = Promise.resolve({ docs: ['primero', 'segundo'] });
  const array_2 = ['primero', 'segundo'];
  from(array_2).pipe(
    mergeMap(value => fakeHttpRequest(value)),
    map(res => res.doc)
  )
    .subscribe(value => console.log(`value is: ${value}`));
  
  
  function fakeHttpRequest(param) {
    return from(
      Promise.resolve({ doc: `fake response for "${param}"` })
    ).pipe(
      delay(1000)
    );
  }
  // value is: fake response for "primero"
  // value is: fake response for "segundo"
})
