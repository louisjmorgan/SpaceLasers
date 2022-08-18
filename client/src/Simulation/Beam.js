/* eslint-disable react/prop-types */
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import { Vector3 } from 'three';
import { generateLaserBodyCanvas, LaserBeam } from './Shaders/LaserBeam';

function Beam({
  beam, spacePower, customer, frame,
}) {
  const laser = useRef();

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
    } else {
      laser.current = false;
    }
  });

  // const texture = useMemo(() => generateLaserBodyCanvas(), []);

  // useEffect(() => {
  //   if (!beam.activated[frame]) laser.current = null;
  //   else laser.current = LaserBeam(beam.distances[frame], 0.01, generateLaserBodyCanvas());
  // }, [frame]);

  return beam.activated[frame] && (
    <primitive
      object={LaserBeam(beam.distances[frame], 0.01, generateLaserBodyCanvas())}
      position={[0, 0, 0]}
      ref={ref}
    />
  );
}

export default Beam;
