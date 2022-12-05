var express = require('express');
// const { createSatellite } = require('../models/satellite');
var router = express.Router();
const missionSchema = require('../models/mission.js')
const { createSatellite, createPowerSatellite } = require('../models/satellite.js')
const { 
  getTimeArray, 
  getSatellitePositions, 
  getSunPositions, 
  getEclipsedArray, 
  getCurrentDuties, 
  getBeams, 
  getBeamDuties, 
  getChargeStates, 
  getTotalCharged 
} = require('../models/simulation.js');

exports.mission_post = async function(req, res, next) {
  try {
    await missionSchema.validate(req.body);
  } catch (err) {
    return res.status(500).json({ type: err.name, message: `${err.path} ${err.message}` });
  }
  
  // initialize customers
  const customers = req.body.customers.map((customer) => {
    return createSatellite(customer.name, req.body, {tle1: customer.tle1, tle2: customer.tle2});
  })

  // initialize global simulation parameters
  const time = getTimeArray(customers[0].params.orbit.epochdate);
  const sun = getSunPositions(time)
  
  // simulate customer orbits and duties
  customers.forEach((customer) => {
    customer.positions = getSatellitePositions(customer.params, time)
    customer.performance = {
      currentDuties: getCurrentDuties(customer.params.load.duties, time),
      isEclipsed: getEclipsedArray(customer, sun, time)
    }
  })
  


  
  // initialize space power satellites
  let multiplier = 0;
  const inclinationOffsets = Array.from({length: req.body.powerSats}, (value, index) => {
    if (index % 2 == 0) multiplier += 1;
    return req.body.inclinationOffset * multiplier * ((0-1) ** index)
  })

  const spacePowers = inclinationOffsets.map((offset, index) => {
    return createPowerSatellite(`Space Power ${index + 1}`, {tle1: req.body.customers[0].tle1, tle2: req.body.customers[0].tle2}, offset);
  });

  // simulate space power orbits and initialize beams
  const beams = []
  spacePowers.forEach((spacePower) => {
    spacePower.positions = getSatellitePositions(spacePower.params, time)
    const satBeams = getBeams(spacePower, customers, time)
    spacePower.performance = {
      currentDuties: getBeamDuties(satBeams, time),
      isEclipsed: getEclipsedArray(spacePower, sun, time),
    }
    beams.push(...satBeams)
  }) 
  
  // simulate batteries
  customers.forEach((customer) => {
    customer.performance = {
      ...customer.performance,
      chargeStateBeams: getChargeStates(customer, beams, time),
      chargeStateNoBeams: getChargeStates(customer, null, time),
    }
    customer.summary = {
      totalCharged: getTotalCharged(customer.performance.chargeStateBeams, customer.performance.chargeStateNoBeams)
    }
  })

  spacePowers.forEach((spacePower) => {
    spacePower.performance = {
      ...spacePower.performance,
      chargeState: getChargeStates(spacePower, null, time),
    }
  })


  // calculate averages
  const averages = {
    chargeStateBeams: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeStateBeams[index], 0) / customers.length),
    chargeStateNoBeams: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeStateNoBeams[index], 0) / customers.length)
  }


  res.json({
    test: customers.averages.chargeStateBeams,
    // test2: customers[0].performance.chargeStateBeams,
    // test3: customers[0].performance.chargeStateNoBeams,
  })

  // res.json({
  //   success: true,
  //   time: time,
  //   satellites: {
  //     customers: customers,
  //     spacePowers: spacePowers,
  //   },
  //   beams: beams,
  //   sun: sun,
  // })
}

