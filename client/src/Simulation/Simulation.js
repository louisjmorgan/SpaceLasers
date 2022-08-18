/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
import { Canvas } from '@react-three/fiber';
import { GridItem } from '@chakra-ui/react';
import {
  Stars, View,
} from '@react-three/drei';
import { Suspense, useRef } from 'react';
import Frame from './Frame';
import Earth from './Earth';
import Sun from './Sun';
import Camera from './Camera';
import Satellites from './Satellites';

function Simulation({
  simData, currentFrame, setCurrentFrame, ui, handleLabel,
}) {
  const viewRef = useRef();
  const earthRef = useRef();
  const container = useRef();

  return (
    <GridItem area="1 / 1 / 4 / 3">
      <div
        ref={container}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          ref={viewRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'inline-block',
            zIndex: 0,
          }}
        />
        <Canvas
          className="canvas"
          onCreated={(state) => state.events.connect(container.current)}
          mode="concurrent"
          style={{
            pointerEvents: 'none',
            position: 'fixed',
            top: '0px',
            left: '0px',
          }}
        >
          <Suspense fallback={null}>

            <View index={1} track={viewRef}>
              <Camera target={{
                name: 'earth',
                ref: null,
                lock: true,
              }}
              />
              <Frame setCurrentFrame={setCurrentFrame} speed={1} paused={false} />
              <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={5000} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={1} // Saturation 0-1 (default=0)
                fade
              />
              {/* <ambientLight intensity={0.1} /> */}
              <Sun position={simData.sun} frame={currentFrame} />
              <Earth frame={currentFrame} angles={simData.earth} ref={earthRef} />
              <Satellites
                customers={simData.satellites.customers}
                spacePowers={simData.satellites.spacePowers}
                beams={simData.beams}
                frame={currentFrame}
                viewRef={viewRef}
                handleLabel={handleLabel}
                ui={ui}
              />
            </View>
          </Suspense>
        </Canvas>
      </div>
    </GridItem>
  );
}

export default Simulation;
