/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Html, Instance } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Satellite({
  satellite, color, frame, handleLabel, showLabel, viewRef,
}) {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.position.x = satellite.positions.x[frame];
    ref.current.position.y = satellite.positions.y[frame];
    ref.current.position.z = satellite.positions.z[frame];
    const earth = new THREE.Vector3(0, 0, 0);

    const lookAt = earth.clone().sub(ref.current.position);
    const up = new THREE.Vector3(0, 0, 1);
    // up.applyQuaternion(satRef.current.quaternion);
    ref.current.up.set(up.x, up.y, up.z);
    ref.current.lookAt(earth);
  });

  return (

    <Instance
      ref={ref}
      scale={0.01}
      onClick={() => handleLabel(satellite.id)}
      color={color}
    >
      {showLabel ? (
        <Html
          style={{
            fontFamily: 'sans-serif',
            color: 'white',
            fontSize: '1rem',
            width: '100ch',
            height: '2rem',
          }}
          portal={viewRef}
        >

          <p>
            {satellite.name}
          </p>
          <p>
            {`${(satellite.performance.chargeState[frame] * 100).toFixed(1)}%`}
          </p>

        </Html>
      ) : (
        ''
      )}
    </Instance>
  );
}

export default Satellite;
