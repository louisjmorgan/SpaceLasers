/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import * as THREE from 'three';
import { earthRadius } from 'satellite.js/lib/constants';

function isEclipsed(satRef, sunRef, earthRef) {
  const sunPosition = sunRef.current.position;
  const earthPosition = earthRef.current.position;
  const satPosition = satRef.position;

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

function generateDuties(station, duties, time) {
  Object.entries(station.load).forEach((loadProfile) => {
    if (loadProfile[1].default === false) {
      const { cycles, duration } = loadProfile[1];
      const interval =
        (station.orbit.period - duration * cycles) / cycles;
      const nextStart = time.initial.valueOf() + interval * 1000;
      const newDuty = {
        interval,
        duration,
        nextCompletion: null,
        nextStart,
      };
      duties.current.set(loadProfile[1].name, newDuty);
    }
  });
}

function chargeBattery(
  station,
  currentDuty,
  time,
  delta,
  profile,
  chargeState
) {
  const powerProfile = station.profiles.get(profile);
  const netCurrent = powerProfile.get(currentDuty.current);
  const { capacity } = station.battery;

  if (chargeState.current >= 1.0 && netCurrent >= 0) {
    chargeState.current = 1;
    return;
  }

  if (chargeState.current <= 0 && netCurrent <= 0) {
    chargeState.current = 0;
    return;
  }

  const newChargeState =
    (chargeState.current * capacity +
      delta * time.speed * (1 / 3600) * netCurrent) /
    capacity;
  chargeState.current = newChargeState;
}

function updateDuty(duties, currentDuty, time) {
  duties.current.forEach((duty, name) => {
    let newDuty = {
      ...duty,
    };
    if (currentDuty.current !== name) {
      if (time.current.valueOf() >= duty.nextStart) {
        currentDuty.current = name;

        const nextCompletion =
          time.current.valueOf() + duty.duration * 1000;
        newDuty = {
          ...duty,
          nextCompletion,
        };
      }
    } else if (currentDuty.current === name) {
      if (time.current.valueOf() >= duty.nextCompletion) {
        currentDuty.current = 'power storing';
        newDuty = {
          ...duty,
          nextStart: time.current.valueOf() + duty.interval * 1000,
        };
        duties.current.set(name, newDuty);
      }
    }
    duties.current.set(name, newDuty);
  });
}

export { isEclipsed, generateDuties, chargeBattery, updateDuty };
