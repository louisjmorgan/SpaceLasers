/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { FRAMES, SIM_LENGTH, MIN_SPEED } from '../Util/constants';

const interval = 1 / 60;

function Frame({ paused, speed, setCurrentFrame }) {
  const runningDelta = useRef(0);
  useFrame(({ clock }, delta) => {
    runningDelta.current += delta;
    let frameIndex = Math.round(
      FRAMES * (runningDelta.current / (SIM_LENGTH / (1000 * MIN_SPEED * speed))),
    );
    if (frameIndex >= FRAMES) {
      frameIndex = 0;
      runningDelta.current = 0;
    }
    setCurrentFrame(frameIndex);
  });

  const { clock } = useThree();

  // useEffect(() => {
  //   if (paused === true) clock.stop();
  //   else clock.start();
  // }, [paused]);

  return null;
}

export default Frame;
