/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as satellite from 'satellite.js/lib/index';
import { Context } from '../App';

const Time = ({ initialDate, updateTime, speed }) => {
  const [time, setTime] = useState({
    current: new Date(initialDate),
  });
  const context = useContext(Context);
  useFrame(({ clock }, delta) => {
    // const temp = new Date(initialDate);
    // console.log(delta);
    // temp.setSeconds(
    //   temp.getSeconds() + clock.getElapsedTime() * speed
    // );
    // const date = temp;
    const temp = time.current;
    const date = new Date(
      temp.setSeconds(temp.getSeconds() + delta * speed)
    );
    setTime({ current: date });
    updateTime(date);
  });

  return null;
};

export default Time;
