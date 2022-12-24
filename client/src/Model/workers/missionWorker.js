import { FRAMES, SIM_LENGTH } from '../../Util/constants';
import {
  initializeConstellations, initializeCustomers,
  simulateBaseData, simulateBatteries, simulateConstellations, simulateSpacePowers,
} from '../mission';

onmessage = function (event) {
  console.log(FRAMES);
  const { req } = event.data;
  postMessage({ done: false, message: 'Simulating celestial bodies' });
  const [time, sun, earth] = simulateBaseData(
    req.constellations[0].satellites[0],
    SIM_LENGTH,
    FRAMES,
  );
  postMessage({ done: false, message: 'Initializing constellations' });
  let constellations = initializeConstellations(req.constellations);
  const customers = initializeCustomers(req.constellations, time, sun);
  postMessage({ done: false, message: 'Initializing space power' });
  const [spacePowers, beams] = simulateSpacePowers(
    time,
    sun,
    req.constellations,
    customers,
    req.offsets,
  );
  postMessage({ done: false, message: 'Simulating power systems' });
  simulateBatteries(customers, time, beams);
  constellations = simulateConstellations(time, constellations, customers, spacePowers);
  const mission = {
    success: true,
    time,
    satellites: {
      customers,
      spacePowers,
    },
    constellations,
    beams,
    sun,
    earth,
  };

  postMessage({ done: true, mission });
};
