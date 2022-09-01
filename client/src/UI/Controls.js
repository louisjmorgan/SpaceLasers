/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button, Flex, FormLabel, Menu, MenuButton, MenuDivider, MenuGroup,
  MenuItem, MenuList, Radio, RadioGroup, Select, Slider,
  SliderFilledTrack, SliderThumb, SliderTrack, Switch, Text,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useStore } from '../Model/store';

function SimControls() {
  const {
    isPaused, togglePaused, speed, setSpeed,
  } = useStore(
    (state) => ({
      isPaused: state.isPaused,
      togglePaused: state.togglePaused,
      speed: state.speed,
      setSpeed: state.setSpeed,
    }),
    shallow,
  );
  return (
    <>
      <MenuItem as={Flex} justify="space-between" align="center">

        <Button onClick={() => togglePaused()}>
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <FormLabel htmlFor="loop" alignSelf="center" mb={0}>
          Loop
          <Switch id="loop" mx={1} />
        </FormLabel>
      </MenuItem>
      <MenuItem>
        <FormLabel htmlFor="speed">Speed</FormLabel>
        <Slider
          name="speed"
          value={speed}
          onChange={(v) => setSpeed(v)}
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
        <RadioGroup onChange={(v) => setLockCamera(v === '1')} value={cameraTarget.lock ? '1' : '0'} disabled={cameraTarget.name === 'earth'}>
          <Radio value="1">Lock</Radio>
          <Radio value="0">Watch</Radio>
        </RadioGroup>
      </MenuItem>
    </>
  );
}

/* eslint-disable react/prop-types */
function Controls({
  times, satellites,
}) {
  // const frame = useStore((state) => state.frame);
  if (!times) return;
  return (
    <Flex align="center">
      <Text width="22ch">{new Date(times[0]).toString().slice(0, 21)}</Text>
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
