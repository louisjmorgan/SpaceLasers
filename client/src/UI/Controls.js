/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button, Flex, FormLabel, Menu, MenuButton, MenuDivider, MenuGroup,
  MenuItem, MenuList, Radio, RadioGroup, Select, Show, Slider,
  SliderFilledTrack, SliderThumb, SliderTrack, Switch,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { AiFillControl } from 'react-icons/ai';
import { useSimStore, useUIStore } from '../Model/store';

function SimControls() {
  const {
    isPaused, setPaused, speed, setSpeed,
  } = useSimStore(
    (state) => ({
      isPaused: state.isPaused,
      setPaused: state.setPaused,
      speed: state.speed,
      setSpeed: state.setSpeed,
    }),
    shallow,
  );

  const {
    shouldLoop, setLoop, isFinished,
  } = useUIStore(
    (state) => ({
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
    <Flex direction="column" align="center" gap={5} p="2ch">
      <MenuItem
        as={Flex}
        justify="space-between"
        align="stretch"
        p={0}
        bg="background.100"
      >
        <Button
          onClick={handlePaused}
          isDisabled={isFinished}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <FormLabel htmlFor="loop" alignSelf="center" m={0}>
          Loop
          <Switch
            id="loop"
            ml={1}
            isChecked={shouldLoop}
            onChange={handleLoop}
          />
        </FormLabel>
      </MenuItem>
      <MenuItem
        bg="background.100"
      >
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
    </Flex>
  );
}

function CameraControls({
}) {
  const {
    cameraTarget, attachCamera, detachCamera, setLockCamera, satelliteOptions,
  } = useSimStore(
    (state) => ({
      cameraTarget: state.cameraTarget,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      setLockCamera: state.setLockCamera,
      satelliteOptions: state.satelliteOptions,
    }),
    shallow,
  );

  return (
    <Flex
      direction="column"
      align="center"
      gap={5}
      p="2ch"
    >
      <Select
        onChange={(e) => {
          if (e.target.value === 'earth') detachCamera();
          else attachCamera(e.target.value);
        }}
        width="20ch"
      >
        <option value="earth">Earth</option>
        {[...satelliteOptions.entries()].map(([id, satellite]) => (
          <option key={id} value={id}>{satellite.name}</option>
        ))}
      </Select>

      <MenuItem bg="background.100">
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
    </Flex>
  );
}

/* eslint-disable react/prop-types */
function Controls() {
  return (
    <Flex align="center" justify="center" height="100%">
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          _expanded={{ bg: 'green.500' }}
        >
          <Flex
            align="center"
            gap={2}
          >
            <Show above="md">
              Controls
            </Show>
            <AiFillControl />
          </Flex>
        </MenuButton>
        <MenuList bg="background.100">
          <MenuGroup title="Animation">
            <SimControls />
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Camera">
            <CameraControls />
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Controls;
