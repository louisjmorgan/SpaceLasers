import nelderMead from 'w-optimization/src/nelderMead.mjs';
import { FRAMES, SIM_LENGTH } from '../Util/constants';
import { handleMissionRequest } from './mission';

function optimizeSpacePower(req) {
  function dischargeLoss(offsetVector) {
    const offsetObj = {
      inclination: offsetVector[0],
      rightAscension: offsetVector[1],
      eccentricity: offsetVector[2],
      perigee: offsetVector[3],
      meanAnomaly: offsetVector[4],
      meanMotion: offsetVector[5],
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
      return Infinity;
    }
  }

  const offsetVector = [6, 0, 0, 0, 0, 0];
  let result;
  nelderMead(dischargeLoss, offsetVector).then((res) => { result = res; });
  return result;
}

export default optimizeSpacePower;
