/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button, Flex, FormLabel, Menu, MenuButton, MenuDivider, MenuGroup,
  MenuItem, MenuList, Radio, RadioGroup, Select, Slider,
  SliderFilledTrack, SliderThumb, SliderTrack, Switch, Text,
} from '@chakra-ui/react';
import { addEffect } from '@react-three/fiber';
import { select } from 'd3';
import { useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';
import { useFrameStore, useStore } from '../Model/store';

function SimControls() {
  const {
    isPaused, setPaused, speed, setSpeed, shouldLoop, setLoop, isFinished,
  } = useStore(
    (state) => ({
      isPaused: state.isPaused,
      setPaused: state.setPaused,
      speed: state.speed,
      setSpeed: state.setSpeed,
      shouldLoop: state.shouldLoop,
      setLoop: state.setLoop,
      isFinished: state.isFinished,
    }),
    shallow,
  );

  const handlePaused = () => {
    setPaused(!isPaused);
  };

  const handleLoop = (e) => {
    setLoop(e.target.checked);
  };

  return (
    <>
      <MenuItem as={Flex} justify="space-between" align="center">

        <Button
          onClick={handlePaused}
          isDisabled={isFinished}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <FormLabel htmlFor="loop" alignSelf="center" mb={0}>
          Loop
          <Switch
            id="loop"
            mx={1}
            isChecked={shouldLoop}
            onChange={handleLoop}
          />
        </FormLabel>
      </MenuItem>
      <MenuItem>
        <FormLabel htmlFor="speed">Speed</FormLabel>
        <Slider
          name="speed"
          value={speed}
          onChange={setSpeed}
          min={1}
          max={10}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </MenuItem>
    </>
  );
}

function CameraControls({
  satellites,
}) {
  const {
    cameraTarget, attachCamera, detachCamera, setLockCamera,
  } = useStore(
    (state) => ({
      cameraTarget: state.cameraTarget,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      setLockCamera: state.setLockCamera,
    }),
    shallow,
  );
  return (
    <>

      <Select onChange={(e) => {
        if (e.target.value === 'earth') detachCamera();
        else attachCamera(e.target.value);
      }}
      >
        <option value="earth">Earth</option>
        {satellites.customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </Select>

      <MenuItem>
        <RadioGroup
          onChange={(v) => setLockCamera(v === '1')}
          value={cameraTarget.lock ? '1' : '0'}
          disabled={cameraTarget.name === 'earth'}
          as={Flex}
          justify="space-around"
          width="100%"
        >
          <Radio value="1">Lock</Radio>
          <Radio value="0">Watch</Radio>
        </RadioGroup>
      </MenuItem>
    </>
  );
}

/* eslint-disable react/prop-types */
function Controls() {
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);
  const {
    time, satellites, view,
  } = useStore(
    (state) => ({
      time: state.mission.time,
      satellites: state.mission.satellites,
      view: state.view,
    }),
    shallow,
  );
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
    <Flex align="center" justify={view.name === 'simulation' ? 'center' : 'space-between'} height="100%">
      <Text ref={timeRef} width="22ch" m={2} />
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Controls
        </MenuButton>
        <MenuList>
          <MenuGroup title="Animation">
            <SimControls />
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Camera">
            <CameraControls
              satellites={satellites}
            />
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Controls;
