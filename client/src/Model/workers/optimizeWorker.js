import { expose } from 'threads/worker';
import optimizeSpacePower from '../optimizer';

expose({
  async optimize(req) {
    return optimizeSpacePower(req);
  },
});
