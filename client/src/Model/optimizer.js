import nelderMead from 'w-optimization/src/nelderMead.mjs';
import { FRAMES, SIM_LENGTH } from '../Util/constants';
import { handleMissionRequest } from './mission';

async function optimizeSpacePower(req) {
  function dischargeLoss(offsetVector) {
    const offsetObj = {
      inclination: Math.abs(offsetVector[0]),
      rightAscension: Math.abs(offsetVector[1]),
      eccentricity: Math.abs(offsetVector[2]),
      perigee: Math.abs(offsetVector[3]),
      meanAnomaly: Math.abs(offsetVector[4]),
      meanMotion: Math.abs(offsetVector[5]),
    };

    const testReq = {
      ...req,
      offsets: offsetObj,
    };
    let mission;
    try {
      mission = handleMissionRequest(testReq, SIM_LENGTH, FRAMES / 120);
      const result = mission.satellites.fleet.summary.totalDischarge;
      return result;
    } catch {
      return NaN;
    }
  }

  const offsetVector = [
    req.offsets.inclination,
    req.offsets.rightAscension,
    req.offsets.eccentricity,
    req.offsets.perigee,
    req.offsets.meanAnomaly,
    req.offsets.meanMotion,
  ];
  const result = await nelderMead(dischargeLoss, offsetVector);
  return {
    inclination: Math.abs(result.x[0]),
    rightAscension: Math.abs(result.x[1]),
    eccentricity: Math.abs(result.x[2]),
    perigee: Math.abs(result.x[3]),
    meanAnomaly: Math.abs(result.x[4]),
    meanMotion: Math.abs(result.x[5]),
  };
}

export default optimizeSpacePower;
