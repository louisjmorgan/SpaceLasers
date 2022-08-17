/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import * as Yup from 'yup';
import { createSatellite, createPowerSatellite, getOffsets } from './satellite';
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

const MissionSchema = Yup.object().shape({

  satellites: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .trim(),
        // size: Yup.number()
        //   .integer()
        //   .min(1, 'Size must be 1 or more!')
        //   .max(6, 'Size must be 6 or less!')
        //   .required('size is required'),
        // tle1: Yup.string()
        //   .min(69, 'tle must be 69 columns')
        //   .max(69, 'tle must be 69 columns')
        //   .required('tle line 1 is required'),
        // tle2: Yup.string()
        //   .min(69, 'tle must be 69 columns')
        //   .max(69, 'tle must be 69 columns')
        //   .required('tle line 2 required'),

        orbit: Yup.object().shape({
          tle: Yup.string(),
          meanMotionDot: Yup.number()
            .min(-1, 'Must be more than -1')
            .max(1, 'Must be less than 1')
            .required('meanMotionDot is required'),
          bstar: Yup.number()
            .min(-2, 'Must be between -2 and 2')
            .max(2, 'Must be between -2 and 2')
            .required('bstar is required'),
          inclination: Yup.number()
            .min(0, 'Must be 0-360°')
            .max(360, 'Must be 0-360°')
            .required('inclination is required'),
          rightAscension: Yup.number()
            .min(0, 'Must be 0-360°')
            .max(360, 'Must be 0-360°')
            .required('right ascension is required'),
          eccentricity: Yup.number()
            .min(0, 'Must be between 0 and 1')
            .max(1, 'Must be between 0 and 1')
            .required('eccentricity is required'),
          perigee: Yup.number()
            .min(0, 'Must be 0-360°')
            .max(360, 'Must be 0-360°')
            .required('perigee is required'),
          meanAnomaly: Yup.number()
            .min(0, 'Must be 0-360°')
            .max(360, 'Must be 0-360°')
            .required('mean anomaly is required'),
          meanMotion: Yup.number()
            .min(0, 'Must be greater than 0')
            .max(16, 'Must be less than 16')
            .required('mean motion is required'),
        }),
        power: Yup.object().shape({
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
          powerStoringConsumption: Yup.number()
            .min(0, 'Must be greater than 0')
            .required('Power storing consumption is required'),
        }),
        duties: Yup.array()
          .of(
            Yup.object().shape({
              type: Yup.string()
                .oneOf(['cyclical'])
                .required('Type is required'),
              name: Yup.string()
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('required!'),
              priority: Yup.number()
                .integer()
                .min(1)
                .required('Priority is required'),
              consumption: Yup.number()
                .min(0, 'Must be positive')
                .required('Consumption is required'),
              duration: Yup.number()
                .min(0, 'Must be positive')
                .when(
                  'type',
                  {
                    is: 'cyclical',
                    then: Yup.number().required('Duration is required'),
                  },
                ),
              cycles: Yup.number()
                .min(0, 'Must be positive')
                .when(
                  'type',
                  {
                    is: 'cyclical',
                    then: Yup.number().required('Cycles is required'),
                  },
                ),
            }),
          ),
      }),
    ),
  powerSats: Yup.number()
    .integer()
    .min(0, 'Must be an integer greater than or equal to 0'),
  offsets: Yup.object().shape({
    inclination: Yup.number()
      .min(0, 'Must be 0-36°')
      .max(36, 'Must be 0-36°')
      .required('inclination is required'),
    rightAscension: Yup.number()
      .min(0, 'Must be 0-36°')
      .max(36, 'Must be 0-36°')
      .required('right ascension is required'),
    eccentricity: Yup.number()
      .min(0, 'Must be between 0 and 1')
      .max(1, 'Must be between 0 and 1')
      .required('eccentricity is required'),
    perigee: Yup.number()
      .min(0, 'Must be 0-36°')
      .max(36, 'Must be 0-36°')
      .required('perigee is required'),
    meanAnomaly: Yup.number()
      .min(0, 'Must be 0-360°')
      .max(360, 'Must be 0-360°')
      .required('mean anomaly is required'),
    meanMotion: Yup.number()
      .min(0, 'Must be greater than 0')
      .max(16, 'Must be less than 16')
      .required('mean motion is required'),
  }),
});

const handleMissionRequest = (req) => {
  // try {
  //   missionSchema.validate(req);
  // } catch (err) {
  //   console.log(err);
  //   return new Error({ type: err.name, message: `${err.path} ${err.message}` });
  // }

  // initialize customers
  const customers = req.satellites.map((customer) => createSatellite(customer));
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

  const offsets = getOffsets(req.spacePowers, req.satellites.length, req.offsets);

  // const spacePowers = req.satellites.map((satellite, index) => {
  //   if (!offsets[index]) return;
  //   return offsets[index].map((offset) => createPowerSatellite(
  //     `Space Power ${index + 1}`,
  //     satellite.orbit,
  //     offset,
  //   ));
  // });
  const spacePowers = [];

  req.satellites.forEach((satellite, index) => {
    if (!offsets[index]) return;
    return offsets[index].forEach((offset) => spacePowers.push(createPowerSatellite(
      `Space Power ${index + 1}`,
      satellite.orbit,
      offset,
    )));
  });

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

export { handleMissionRequest, MissionSchema };
