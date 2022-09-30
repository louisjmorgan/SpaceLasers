/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { earthRadius } from 'satellite.js/lib/constants';
import { Vector3 } from 'three';

const earthPosition = new Vector3(0, 0, 0);
const sunPosition = new Vector3();
const satPosition = new Vector3();
const sunEarth = new Vector3();
const sunSat = new Vector3();

function isEclipsed(satellite, sun) {
  sunPosition.fromArray([sun.x, sun.y, sun.z]);
  satPosition.fromArray([satellite.x, satellite.y, satellite.z]);

  sunEarth.subVectors(earthPosition, sunPosition);
  sunSat.subVectors(satPosition, earthPosition);

  const angle = sunEarth.angleTo(sunSat);

  const sunEarthDistance = sunPosition.distanceTo(earthPosition);
  const sunSatDistance = sunPosition.distanceTo(satPosition);
  const limbAngle = Math.atan2(earthRadius, sunEarthDistance);

  if (angle > limbAngle || sunSatDistance < sunEarthDistance) {
    return false;
  }
  return true;
}

function getNetCurrent(params, source, currentDuty) {
  const powerProfile = params.load.powerProfiles[source];
  return powerProfile[currentDuty];
}

function getChargeState(
  params,
  currentDuty,
  source,
  chargeState,
  delta,
) {
  const netCurrent = getNetCurrent(params, source, currentDuty);
  const { capacity } = params.battery;

  if (chargeState >= 1.0 && netCurrent >= 0) {
    return 1;
  }

  if (chargeState <= 0 && netCurrent <= 0) {
    return 0;
  }

  return (
    (
      (chargeState * capacity)
      + (delta * netCurrent)
    ) / capacity
  );
}

export { isEclipsed, getChargeState, getNetCurrent };
