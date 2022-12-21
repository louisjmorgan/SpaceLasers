/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-restricted-globals */
import { expose } from 'threads/worker';
import {
  simulateBatteries, simulateConstellations, simulateSpacePowers,
} from '../mission';

let mission;
const fitnessWorker = {
  initialize(partialMission) {
    mission = partialMission;
    return true;
  },
  calculate(req) {
    return new Promise((resolve) => {
      try {
        const [spacePowers, beams] = simulateSpacePowers(
          mission.time,
          mission.sun,
          req.constellations,
          mission.satellites.customers,
        );
        simulateBatteries(mission.satellites.customers, mission.time, beams);
        const constellations = simulateConstellations(
          mission.time,
          mission.constellations,
          mission.satellites.customers,
          spacePowers,
        );
        resolve(constellations[0].summary.dischargeSaved);
      } catch (e) {
        resolve(0);
      }
    });
  },
};

expose(fitnessWorker);
