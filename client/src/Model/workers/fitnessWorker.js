/* eslint-disable no-restricted-globals */
import {
  simulateBatteries, simulateConstellations, simulateSpacePowers,
} from '../mission';

onmessage = (event) => {
  try {
    const { req } = event.data;

    const [spacePowers, beams] = simulateSpacePowers(
      self.mission.time,
      self.mission.sun,
      req.constellations,
      self.mission.satellites.customers,
    );
    simulateBatteries(self.mission.satellites.customers, self.mission.time, beams);
    const constellations = simulateConstellations(
      self.mission.time,
      self.mission.constellations,
      self.mission.satellites.customers,
      spacePowers,
    );
    const restMission = {
      success: true,
      satellites: {
        spacePowers,
      },
      constellations,
      beams,
    };

    postMessage({ done: true, mission: restMission });
  } catch (e) {
    postMessage({ done: false, error: e });
  }
};
