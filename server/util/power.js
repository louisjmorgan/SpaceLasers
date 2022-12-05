/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
const THREE = require('three');
const { earthRadius } = require('satellite.js/lib/constants');
const {SIM_LENGTH, FRAMES} = require('./constants')

function isEclipsed(satellite, sun) {
  const earthPosition = new THREE.Vector3(0, 0, 0);
  const sunPosition = new THREE.Vector3(sun.x, sun.y, sun.z);
  const satPosition = new THREE.Vector3(satellite.x, satellite.y, satellite.z);

  const sunEarth = new THREE.Vector3();
  sunEarth.subVectors(earthPosition, sunPosition);

  const sunSat = new THREE.Vector3();
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



function getChargeState(
  params,
  currentDuty,
  source,
  chargeState,
  delta,
) {
  const powerProfile = params.load.powerProfiles[source];
  const netCurrent = powerProfile[currentDuty]
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
      + (delta *  netCurrent)
    ) / capacity
  );
}


module.exports = {isEclipsed, getChargeState };
