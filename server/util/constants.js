const SIM_LENGTH = 24 * 60 * 60 * 2 * 1000;  // ms
const FPmS = 60 / 1000;
const MIN_SPEED = 60;
const BEAM_DISTANCE = 1000
const FRAMES = SIM_LENGTH * (FPmS / MIN_SPEED);

module.exports = {
  SIM_LENGTH,
  FRAMES,
  BEAM_DISTANCE
}