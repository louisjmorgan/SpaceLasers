/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import { Observable } from 'threads/observable';
import { expose } from 'threads/worker';
import optimizeSpacePower from '../optimizer';

expose({
  optimize(req) {
    const optimizeGen = optimizeSpacePower(req);
    return new Observable(async (observer) => {
      let result = { done: false, value: null };
      while (!result.done) {
        result = await optimizeGen.next();
        console.log(result);
        observer.next(result.value);
      }
      observer.complete();
    });
  },
});
