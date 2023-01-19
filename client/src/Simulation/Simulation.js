/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
import { Canvas } from '@react-three/fiber';
import { Box, GridItem } from '@chakra-ui/react';
import {
  Stars, View, PerformanceMonitor,
} from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { useSimStore } from '../Model/store';
import Frame from './Frame';
import Earth from './Earth';
import Sun from './Sun';
import Camera from './Camera';
import Satellites from './Satellites';
import LoopDialog from '../UI/LoopDialog';

function Simulation() {
  const viewRef = useRef();
  const container = useRef();
  const isPaused = useSimStore((state) => state.isPaused);

  const [dpr, setDpr] = useState(1);
  return (

    <GridItem area="1 / 1 / 4 / 3">
      <div
        ref={container}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          // display: `${shouldDisplay ? 'block' : 'none'}`,
        }}
      >

        <Canvas
          className="canvas"
          onCreated={(state) => {
            state.events.connect(container.current);
          }}
          style={{
            pointerEvents: 'none',
            position: 'fixed',
            cursor: 'pointer',
            top: '0px',
            left: '0px',
          }}
          dpr={dpr}
        >
          <Suspense>

            <PerformanceMonitor
              onChange={({ factor }) => setDpr((0.75 + 1.5 * factor).toFixed(1))}
            />
            <Camera />
            <Frame />
            <Stars
              radius={100} // Radius of the inner sphere (default=100)
              depth={50} // Depth of area where stars should fit (default=50)
              count={5000} // Amount of stars (default=5000)
              factor={4} // Size factor (default=4)
              saturation={1} // Saturation 0-1 (default=0)
              fade
              speed={isPaused ? 0 : 1}
            />
            <Sun />
            <Earth />
            <Satellites />
          </Suspense>
        </Canvas>
      </div>
    </GridItem>
  );
}

export default Simulation;
