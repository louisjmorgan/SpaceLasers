/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useRef,
  useState,
  useContext,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from 'styled-components';
import { Context } from '../App';

const Satellite = ({
  color,
  station,
  initialDate,
  getOrbitAtTime,
  storeRef,
  name,
  toggleLabel,
}) => {
  const satRef = useRef();
  const textRef = useRef();
  const context = useContext(Context);
  storeRef(name, satRef);
  useFrame(({ clock }) => {
    const position = getOrbitAtTime(
      station,
      initialDate,
      clock.getElapsedTime() * context.animationSpeed
    );
    // if (position.z > 0) console.log(`${name} is in the sun`);
    // else console.log(`${name} no longer in the sun`);
    satRef.current.position.x = position.x;
    satRef.current.position.y = position.y;
    satRef.current.position.z = position.z;
    // orbitRef.current.points = points;
  });

  return (
    <>
      <mesh
        ref={satRef}
        onClick={() => {
          toggleLabel(station);
        }}
      >
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshPhongMaterial
          attach="material"
          color={color}
          flatShading={false}
          side={THREE.DoubleSide}
        />
        {station.showLabel ? (
          <Html>
            <LabelWrapper>
              <h1
                style={{
                  fontFamily: 'sans-serif',
                  color: 'white',
                  fontSize: '1rem',
                }}
              >
                {station.name}
              </h1>
            </LabelWrapper>
          </Html>
        ) : (
          ' '
        )}
      </mesh>
      {/* <Line ref={orbitRef} /> */}
    </>
  );
};

Satellite.propTypes = {
  color: PropTypes.number,
  station: PropTypes.object.isRequired,
  getOrbitAtTime: PropTypes.func.isRequired,
};

Satellite.defaultProps = {
  color: 0xff0000,
};

const LabelWrapper = styled.div``;

export default Satellite;
