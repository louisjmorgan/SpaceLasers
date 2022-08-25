import { FRAMES, SIM_LENGTH, MIN_SPEED } from './constants';

export default function getNextFrame(frame, delta, speed) {
  return frame + Math.round(
    FRAMES * ((delta * 1000 * MIN_SPEED * speed) / (SIM_LENGTH)),
  );
}
