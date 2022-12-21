import { Text } from '@chakra-ui/layout';
import { addEffect } from '@react-three/fiber';
import { select } from 'd3';
import { useEffect, useRef } from 'react';
import { useFrameStore, useSimStore } from '../Model/store';

function Time() {
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  const time = useSimStore((state) => state.mission.time);
  const timeRef = useRef();
  const date = useRef(new Date());
  addEffect(() => {
    if (!date.current) return;
    if (!timeRef.current) return;
    date.current.setTime(Number(time[frame.current]));
    select(timeRef.current)
      .text(date.current.toString().slice(0, 21));
  });
  return (
    <Text textTransform="uppercase" fontWeight="bold" ref={timeRef} width="20ch" m={2} />
  );
}

export default Time;
