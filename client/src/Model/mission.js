/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import * as Yup from 'yup';
import { createSatellite, createPowerSatellite } from './satellite';
import {
  getTimeArray,
  getSatellitePositions,
  getSunPositions,
  getEclipsedArray,
  getCurrentDuties,
  getBeams,
  getBeamDuties,
  getChargeStates,
  getTotalCharged,
  getEarthRotationAngles,
} from './simulation';

const missionSchema = Yup.object().shape({
  customers: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .trim(),
        size: Yup.number()
          .integer()
          .min(1, 'Size must be 1 or more!')
          .max(6, 'Size must be 6 or less!')
          .required('size is required'),
        tle1: Yup.string()
          .min(69, 'tle must be 69 columns')
          .max(69, 'tle must be 69 columns')
          .required('tle line 1 is required'),
        tle2: Yup.string()
          .min(69, 'tle must be 69 columns')
          .max(69, 'tle must be 69 columns')
          .required('tle line 2 required'),
        pvVoltage: Yup.number()
          .min(0, 'Must be positive')
          .required('pv voltage is required'),
        currentDensity: Yup.number()
          .min(0, 'Must be positive')
          .required('pv current density is required'),
        area: Yup.number()
          .min(0, 'Must be greater than 0')
          .required('pv area is required'),
        batteryVoltage: Yup.number()
          .min(0, 'Must be positive')
          .required('battery voltage is required'),
        capacity: Yup.number()
          .min(0, 'Must be greater than 0')
          .required('battery capacity is required'),
        duties: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.number()
                .integer()
                .min(0, 'Must be an integer greater than or equal to 0'),
              name: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('required!'),
              type: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('required!'),
              consumption: Yup.number()
                .min(0, 'Must be positive')
                .required('required'),
              duration: Yup.number()
                .min(0, 'Must be positive'),
              cycles: Yup.number()
                .integer()
                .min(1, 'Must be an integer greater than 0'),
            }),
          ),
      }),
    ),
  powerSats: Yup.number()
    .integer()
    .min(0, 'Must be an integer greater than or equal to 0'),
  inclinationOffset: Yup.number()
    .min(0, 'Must be positive')
    .required('required'),

});

const handleMissionRequest = (req) => {
  try {
    missionSchema.validate(req);
  } catch (err) {
    console.log(err);
    return new Error({ type: err.name, message: `${err.path} ${err.message}` });
  }

  // initialize customers
  const customers = req.customers.map((customer) => createSatellite(customer));

  // initialize global simulation parameters
  const time = getTimeArray(customers[0].params.orbit.epochdate);
  const sun = getSunPositions(time);
  const earth = getEarthRotationAngles(time);

  // simulate customer orbits and duties
  customers.forEach((customer) => {
    customer.positions = getSatellitePositions(customer.params, time);
    customer.performance = {
      currentDuties: getCurrentDuties(customer.params.load.duties, time),
      isEclipsed: getEclipsedArray(customer, sun, time),
    };
  });

  // initialize space power satellites
  let multiplier = 0;
  const inclinationOffsets = Array.from({ length: req.powerSats }, (value, index) => {
    if (index % 2 === 0) multiplier += 1;
    return req.inclinationOffset * multiplier * ((0 - 1) ** index);
  });

  const spacePowers = inclinationOffsets.map((offset, index) => createPowerSatellite(`Space Power ${index + 1}`, { tle1: req.customers[0].tle1, tle2: req.customers[0].tle2 }, offset));

  // simulate space power orbits and initialize beams
  const beams = [];
  spacePowers.forEach((spacePower) => {
    spacePower.positions = getSatellitePositions(spacePower.params, time);
    const satBeams = getBeams(spacePower, customers, time);
    spacePower.performance = {
      currentDuties: getBeamDuties(satBeams, time),
      isEclipsed: getEclipsedArray(spacePower, sun, time),
    };
    beams.push(...satBeams);
  });

  // simulate batteries
  customers.forEach((customer) => {
    customer.performance = {
      ...customer.performance,
      chargeState: getChargeStates(customer, beams, time),
      chargeStateNoBeams: getChargeStates(customer, null, time),
    };
    customer.summary = {
      totalCharged: getTotalCharged(
        customer.performance.chargeState,
        customer.performance.chargeStateNoBeams,
      ),
    };
  });

  spacePowers.forEach((spacePower) => {
    spacePower.performance = {
      ...spacePower.performance,
      chargeState: getChargeStates(spacePower, null, time),
    };
  });

  // calculate averages
  const averages = {
    performance: {
      chargeState: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeState[index], 0) / customers.length),
      chargeStateNoBeams: time.map((t, index) => customers.reduce((prev, current) => prev + current.performance.chargeStateNoBeams[index], 0) / customers.length),
    },
  };

  return {
    success: true,
    time,
    satellites: {
      customers,
      spacePowers,
      averages,
    },
    beams,
    sun,
    earth,
  };
};

export default handleMissionRequest;
