/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import shallow from 'zustand/shallow';
import useStore from '../Model/store';
import { FRAMES, SIM_LENGTH, MIN_SPEED } from '../Util/constants';

const interval = 1 / 60;

function Frame() {
  const updateFrame = useCallback((frame) => {
    useStore.setState({ frame });
  }, []);

  const { isPaused, speed } = useStore(
    (state) => ({ isPaused: state.isPaused, speed: state.speed }),
    shallow,
  );

  const frame = useRef(0);
  useFrame(({ clock }, delta) => {
    if (!isPaused) {
      let newFrame = frame.current + Math.round(
        FRAMES * ((delta * 1000 * MIN_SPEED * speed) / (SIM_LENGTH)),
      );

      if (newFrame >= FRAMES) {
        newFrame = 0;
      }
      if (newFrame !== frame.current) {
        frame.current = newFrame;
        updateFrame(newFrame);
      }
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
