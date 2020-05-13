import { from, BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap, skipWhile, take } from 'rxjs/operators';

/** merges into a new observable that will be obtained once the the queue from the previous ones is below the given number */
const queueMap = <T = any, I = any>(inputGetter: (value: T) => Observable<I>, maxQueueSize: number = 1) => {
  const getNewQueue = (queue: Symbol[], item: Symbol) => Array.from(new Set([...queue, item]));
  const queue$ = new BehaviorSubject<Symbol[]>([]);
  return (source$: Observable<T>) =>
    source$.pipe(
      take(1),
      mergeMap(sourceValue => {
        const id = Symbol();
        if (queue$.value.length >= maxQueueSize) queue$.next(getNewQueue(queue$.value, id));
        return queue$.pipe(
          skipWhile(queue => queue.includes(id)),
          take(1),
          tap(queue => queue$.next(getNewQueue(queue, id))),
          mergeMap(() => inputGetter(sourceValue).pipe(tap(() => queue$.next(queue$.value.filter(symbol => symbol !== id).slice(1, queue$.value.length)))))
        );
      })
    );
};

const wait = (time: number) =>
  new Promise(resolve => {
    console.log('promise called');
    setTimeout(resolve, time);
  });

const obs$ = new BehaviorSubject(null).pipe(queueMap(() => from(wait(1000)), 1));

const now = Date.now();

obs$.pipe(tap(() => console.log('1: ', Date.now() - now))).subscribe();
obs$.pipe(tap(() => console.log('2: ', Date.now() - now))).subscribe();
obs$.pipe(tap(() => console.log('3: ', Date.now() - now))).subscribe();
obs$.pipe(tap(() => console.log('4: ', Date.now() - now))).subscribe();
