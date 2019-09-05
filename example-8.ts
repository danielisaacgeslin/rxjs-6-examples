/** custom operator */
import { of, Observable, Subject } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

export const delayEx = (fn, delayTime: number): (...args: any[]) => void => {
  let lastRun: number = new Date(0).getTime();
  return (...args) => {
    const nextRun = delayTime > Date.now() - lastRun ? Math.max(Date.now(), lastRun) + delayTime : Date.now();
    const nextRunDelay = nextRun - Date.now();
    lastRun = nextRun;
    setTimeout(() => fn(...args), Math.max(nextRunDelay, 0));
  };
};

const queueTime = (timeWindow: number) => <T>(source$: Observable<T>) => {
  const subject = new Subject<T>();
  const queue = delayEx((fn: () => void) => fn(), timeWindow);
  source$.pipe(
    delay(0),
    finalize(() => queue(() => subject.complete()))
  ).subscribe(item => queue(() => subject.next(item)));
  return subject.asObservable();
}

console.log('start', Date.now())
of(1, 2, 3, 4, 5).pipe(
  queueTime(1000),
  finalize(() => console.log('finalizo', Date.now()))
).subscribe(value => console.log(`value is: ${value} - ${Date.now()}`));
