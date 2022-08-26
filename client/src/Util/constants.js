const SIM_LENGTH = 24 * 60 * 60 * 2 * 1000; // ms
const FPmS = 120 / 1000;

const BEAM_DISTANCE = 1000;
const MIN_SPEED = 600;
const FRAMES = SIM_LENGTH * (FPmS / MIN_SPEED);

module.exports = {
  SIM_LENGTH,
  MIN_SPEED,
  FRAMES,
  BEAM_DISTANCE,
};
