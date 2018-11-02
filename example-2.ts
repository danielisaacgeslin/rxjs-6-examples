/** of (observable) sin rxjs */

function of(...args) {
  return {
    subscribe: (next: Function, error?: Function, complete: Function = () => { }) => {
      args.forEach(next as any);
      complete();
    }
  }
}

console.log('\n FIRST emitiendo multiples valores y completando');
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

console.log('\n SECOND emitiendo 1 valor y completando');
of('a').subscribe(
  value => console.log(`value is: ${value}`),
  null,
  () => console.log('observable completed')
);
// value is: a
// observable completed

console.log('\n THIRD emitiendo 1 valor y completando sin callback');
of('hi').
  subscribe(value => console.log(`value is: ${value}`));
// value is: hi