/* eslint-disable react/prop-types */
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Vector3 } from 'three';
import { generateLaserBodyCanvas, LaserBeam } from './Shaders/LaserBeam';

function Beam({
  beam, spacePower, customer, frame,
}) {
  const ref = useRef();
  useFrame(() => {
    if (beam.activated[frame]) {
      ref.current.position.x = spacePower.positions.x[frame];
      ref.current.position.y = spacePower.positions.y[frame];
      ref.current.position.z = spacePower.positions.z[frame];
      const customerPosition = new Vector3(
        customer.positions.x[frame],
        customer.positions.y[frame],
        customer.positions.z[frame],
      );
      ref.current.lookAt(customerPosition);
      ref.current.rotateY(-Math.PI / 2);
    }
  });

  const texture = useMemo(() => generateLaserBodyCanvas(), []);

  const laser = useMemo(() => {
    if (!beam.activated[frame]) return false;
    const object = LaserBeam(beam.distances[frame], 0.01, generateLaserBodyCanvas());
    return object;
  }, [frame, texture]);

  return laser && <primitive object={laser} position={[0, 0, 0]} ref={ref} />;
}

export default Beam;
