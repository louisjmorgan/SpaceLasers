/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Context } from '../App';

const Time = ({ dispatch, time }) => {
  useFrame(({ clock }, delta) => {
    const temp = time.current;
    const date = new Date(
      temp.setSeconds(temp.getSeconds() + delta * time.speed)
    );
    if (!time.paused) {
      dispatch({
        target: 'state',
        type: 'set time',
        time: date,
      });
    }
  });

  const { clock } = useThree();

  useEffect(() => {
    if (time.paused === true) clock.stop();
    else clock.start();
  }, [time.paused]);

  return null;
};

export default Time;
