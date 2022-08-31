/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Html, Instance } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import shallow from 'zustand/shallow';
import { useFrameStore, useStore } from '../Model/store';

const earth = new THREE.Vector3(0, 0, 0);

function Satellite({
  satellite,
}) {
  const {
    storeRef, toggleLabel, satelliteOptions,
  } = useStore(
    (state) => ({
      storeRef: state.storeRef,
      toggleLabel: state.toggleLabel,
      satelliteOptions: state.satelliteOptions.get(satellite.id),
    }),
    shallow,
  );
  const satRef = useRef();
  const ref = useCallback((node) => {
    if (node !== null) {
      storeRef(satellite.id, node);
      satRef.current = node;
    }
  }, []);
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  useFrame(({ clock }, delta) => {
    satRef.current.position.x = satellite.positions.x[frame.current];
    satRef.current.position.y = satellite.positions.y[frame.current];
    satRef.current.position.z = satellite.positions.z[frame.current];

    const lookAt = earth.clone().sub(satRef.current.position);
    satRef.current.lookAt(earth);
  });

  return (
    <Instance
      ref={ref}
      scale={0.01}
      onClick={() => toggleLabel(satellite.id)}
      color={satelliteOptions.color || 'red'}
      up={[0, 0, 1]}
    >
      {satelliteOptions.showLabel ? (
        <Html
          style={{
            fontFamily: 'sans-serif',
            color: 'white',
            fontSize: '1rem',
            width: '100ch',
            height: '2rem',
          }}
        >
          <p>
            {satellite.name}
          </p>
        </Html>
      ) : (
        ''
      )}
    </Instance>
  );
}

export default Satellite;
