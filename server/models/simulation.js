const { getOrbitAtTime, getSunPosition, getDistance } = require("../util/astronomy.js");
const { isEclipsed, getChargeState } = require("../util/power.js");
const { SIM_LENGTH, FRAMES, BEAM_DISTANCE } = require("../util/constants.js");
const {
  pi,
  tumin,
  deg2rad,
  earthRadius,
} = require('satellite.js/lib/constants.js');


const getTimeArray = function (initial) {
  const initialMillisecs = initial.getTime();
  const mspf = SIM_LENGTH / FRAMES;
  return Array.from({ length: FRAMES }, (value, index) => {
    const time = initialMillisecs + index * mspf;
    return time;
  });
};

const getSatellitePositions = function (satellite, timeArray) {
  const x = []
  const y = []
  const z = []

  timeArray.forEach((time) => {
    const pos = getOrbitAtTime(satellite, new Date(time))
    x.push(pos.x)
    y.push(pos.y)
    z.push(pos.z)
  });

  return {
    x: x,
    y: y,
    z: z,
  }
};

const getSunPositions = function (timeArray) {
  const x = []
  const y = []
  const z = []

  timeArray.forEach((time) => {
    const pos = getSunPosition(new Date(time))
    x.push(pos.x)
    y.push(pos.y)
    z.push(pos.z)
  });

  return {
    x: x,
    y: y,
    z: z,
  }
};

const getEclipsedArray = function (satellite, sun, timeArray) {
  return timeArray.map((time,index) => {
    const satPosition = {
      x: satellite.positions.x[index],
      y: satellite.positions.y[index],
      z: satellite.positions.z[index],
    }

    const sunPosition = {
      x: sun.x[index],
      y: sun.y[index],
      z: sun.z[index],
    }
    return isEclipsed(satPosition, sunPosition)
  })
}

const getCurrentDuties = function (duties, timeArray) {
  return timeArray.map((time) => {
    let currentDuty = 0
    duties.forEach((duty, index) => {
      if (duty.name === 'power storing') return;
      duty.intervals.forEach((cycle) => {
        if ((time >= cycle.start) && (time <= cycle.end)) currentDuty = index;
      });
    });
    return currentDuty
  });
};

const getBeams = function (spacePower, customers, timeArray) {
    return customers.map((customer) => {
      const beamName = `${spacePower.name} - ${customer.name}`
      const distances = timeArray.map((time, index) => {
        const spacePowerPosition = {
          x: spacePower.positions.x[index],
          y: spacePower.positions.y[index],
          z: spacePower.positions.z[index],
        }
        const customerPosition = {
          x: customer.positions.x[index],
          y: customer.positions.y[index],
          z: customer.positions.z[index],
        }
        return getDistance(spacePowerPosition, customerPosition)
      })
      const activated = distances.map((distance, index) => {
        if ((distance * earthRadius) < BEAM_DISTANCE) return true;
        else return false
      })
      return {
        name: beamName,
        distances: distances,
        activated: activated,
        customerId: customer.id,
        spacePowerId: spacePower.id,
      }
    })
}

const getBeamDuties = function(beams, timeArray) {
  return timeArray.map((time, index) => 
    beams.reduce((prev, current) => current.activated[index] || prev, false) ? 1 : 0
  )
}

function getSource(satellite, beams, index) {
  let hasBeam;
  if (beams) {
    const satBeams = beams.filter((b) => b.customerId === satellite.id)
    hasBeam = satBeams.reduce((prev, current) => 
      current.activated[index] || prev, false);  
  } else {
    hasBeam = false;
  }

  const isEclipsed = satellite.performance.isEclipsed[index];

  if (isEclipsed && hasBeam) return 'beam only';
  if (!isEclipsed && hasBeam) return 'sun and beam';
  if (isEclipsed && !hasBeam) return 'eclipsed';
  if (!isEclipsed && !hasBeam) return 'sun only';
}

const getChargeStates = function(satellite, beams, timeArray) {
  const delta = ((SIM_LENGTH / (60 * 60 * 1000))/ FRAMES)
  let chargeState = 1;
  return timeArray.map((time, index) => {
    const source = getSource(satellite, beams, index)
    chargeState = getChargeState(satellite.params, satellite.performance.currentDuties[index], source, chargeState, delta)
    return chargeState;
  })
}

function getTotalCharged(beam, noBeam) {
  return beam.map((chargeStateBeam, index) => chargeStateBeam - noBeam[index])
}


module.exports = {
  getTimeArray,
  getSatellitePositions,
  getSunPositions,
  getEclipsedArray,
  getCurrentDuties,
  getChargeStates,
  getBeams,
  getBeamDuties,
  getTotalCharged,
};
