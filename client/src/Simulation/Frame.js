/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { FRAMES, SIM_LENGTH, MIN_SPEED } from '../Util/constants';

const interval = 1 / 60;

function Frame({
  isPaused, speed, currentFrame, setCurrentFrame,
}) {
  const runningDelta = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!isPaused) {
      let frameIndex = currentFrame + Math.round(
        FRAMES * (delta / (SIM_LENGTH / (1000 * MIN_SPEED * speed))),
      );

      if (frameIndex >= FRAMES) {
        frameIndex = 0;
      }
      setCurrentFrame(frameIndex);
    }
  });

  const { clock } = useThree();

  useEffect(() => {
    if (isPaused === true) clock.stop();
    clock.start();
  }, [isPaused]);

  return null;
}

export default Frame;
