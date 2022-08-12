/* eslint-disable consistent-return */
/* eslint-disable max-len */
const {
  earthRadius,
} = require('satellite.js/lib/constants');
const {
  getOrbitAtTime, getSunPosition, getEarthRotationAngle, getDistance,
} = require('../Util/astronomy');
const { isEclipsed, getChargeState } = require('../Util/power');
const { SIM_LENGTH, FRAMES, BEAM_DISTANCE } = require('../Util/constants');

function getTimeArray(initial) {
  const initialMillisecs = initial.getTime();
  const mspf = SIM_LENGTH / FRAMES;
  return Array.from({ length: FRAMES }, (value, index) => {
    const time = initialMillisecs + index * mspf;
    return time;
  });
}

function getSatellitePositions(satellite, timeArray) {
  const x = [];
  const y = [];
  const z = [];

  timeArray.forEach((time) => {
    const pos = getOrbitAtTime(satellite, new Date(time));
    x.push(pos.x);
    y.push(pos.y);
    z.push(pos.z);
  });

  return {
    x,
    y,
    z,
  };
}

function getSunPositions(timeArray) {
  const x = [];
  const y = [];
  const z = [];

  timeArray.forEach((time) => {
    const pos = getSunPosition(new Date(time));
    x.push(pos.x);
    y.push(pos.y);
    z.push(pos.z);
  });

  return {
    x,
    y,
    z,
  };
}

function getEarthRotationAngles(timeArray) {
  return timeArray.map((time) => getEarthRotationAngle(time));
}

function getEclipsedArray(satellite, sun, timeArray) {
  return timeArray.map((time, index) => {
    const satPosition = {
      x: satellite.positions.x[index],
      y: satellite.positions.y[index],
      z: satellite.positions.z[index],
    };

    const sunPosition = {
      x: sun.x[index],
      y: sun.y[index],
      z: sun.z[index],
    };
    return isEclipsed(satPosition, sunPosition);
  });
}

function getCurrentDuties(duties, timeArray) {
  return timeArray.map((time) => {
    let currentDuty = 0;
    duties.forEach((duty, index) => {
      if (duty.name === 'power storing') return;
      duty.intervals.forEach((cycle) => {
        if ((time >= cycle.start) && (time <= cycle.end)) currentDuty = index;
      });
    });
    return currentDuty;
  });
}

function getBeams(spacePower, customers, timeArray) {
  return customers.map((customer) => {
    const beamName = `${spacePower.name} - ${customer.name}`;
    const distances = timeArray.map((time, index) => {
      const spacePowerPosition = {
        x: spacePower.positions.x[index],
        y: spacePower.positions.y[index],
        z: spacePower.positions.z[index],
      };
      const customerPosition = {
        x: customer.positions.x[index],
        y: customer.positions.y[index],
        z: customer.positions.z[index],
      };
      return getDistance(spacePowerPosition, customerPosition);
    });
    const activated = distances.map((distance) => {
      if ((distance * earthRadius) < BEAM_DISTANCE) return true;
      return false;
    });
    return {
      name: beamName,
      distances,
      activated,
      customerId: customer.id,
      spacePowerId: spacePower.id,
    };
  });
}

function getBeamDuties(beams, timeArray) {
  return timeArray.map((time, index) => (beams.reduce((prev, current) => current.activated[index] || prev, false) ? 1 : 0));
}

function getSource(satellite, beams, index) {
  let hasBeam;
  if (beams) {
    const satBeams = beams.filter((b) => b.customerId === satellite.id);
    hasBeam = satBeams.reduce((prev, current) => current.activated[index] || prev, false);
  } else {
    hasBeam = false;
  }

  const hasSun = !satellite.performance.isEclipsed[index];

  if (!hasSun && hasBeam) return 'beam only';
  if (hasSun && hasBeam) return 'sun and beam';
  if (!hasSun && !hasBeam) return 'eclipsed';
  if (hasSun && !hasBeam) return 'sun only';
}

function getChargeStates(satellite, beams, timeArray) {
  const delta = ((SIM_LENGTH / (60 * 60 * 1000)) / FRAMES);
  let chargeState = 1;
  return timeArray.map((time, index) => {
    const source = getSource(satellite, beams, index);
    chargeState = getChargeState(satellite.params, satellite.performance.currentDuties[index], source, chargeState, delta);
    return chargeState;
  });
}

function getTotalCharged(beam, noBeam) {
  return beam.map((chargeStateBeam, index) => chargeStateBeam - noBeam[index]);
}

export {
  getTimeArray,
  getSatellitePositions,
  getSunPositions,
  getEarthRotationAngles,
  getEclipsedArray,
  getCurrentDuties,
  getChargeStates,
  getBeams,
  getBeamDuties,
  getTotalCharged,
};
