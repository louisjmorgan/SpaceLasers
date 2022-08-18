/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button, Flex, FormLabel, Menu, MenuButton, MenuDivider, MenuGroup,
  MenuItem, MenuList, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Switch, Text,
} from '@chakra-ui/react';

function SimControls({
  isPaused, handlePause, speed, handleSpeed,
}) {
  return (
    <>
      <MenuItem as={Flex} justify="space-between" align="center">

        <Button onClick={() => handlePause()}>
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
          onChange={(v) => handleSpeed(v)}
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

/* eslint-disable react/prop-types */
function Controls({
  time, handlePause, isPaused, speed, handleSpeed,
}) {
  if (!time) return;
  return (
    <Flex align="center">
      <Text width="22ch">{new Date(time).toString().slice(0, 21)}</Text>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Controls
        </MenuButton>
        <MenuList>
          <SimControls
            isPaused={isPaused}
            handlePause={handlePause}
            speed={speed}
            handleSpeed={handleSpeed}
          />
          <MenuDivider />
          <MenuGroup title="Camera">
            <MenuItem>Docs</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Controls;
