/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import { Genetic, Select } from 'async-genetic';
import { FRAMES, SIM_LENGTH } from '../Util/constants';
import { generatePartialMission, handleMissionRequest, handleOptimizerMission } from './mission';
// import { twoline2satrec, generateTLE, getOrbitAtTime } from '../Util/astronomy';
import { createPowerSatellite } from './satellite';

const randomOrbit = () => [
  Math.random() * 16, // inclination
  Math.random() * 16, // right ascensions
  Math.random() * 16, // perigee
  Math.random() * 16, // mean anomaly
  Math.random() * 1, // mean motion
  (Math.random()) * 0.1, // ecccentricity (0,1)
  // (Math.random() - 0.5) * 2, // meanMotionDot (-1,1)
  // (Math.random() - 0.5) * 4, // bstar (-2, 2)
];

async function optimizeSpacePower(req) {
  const GENERATIONS = 10;
  const POPULATION = 1000;
  const NUM_WORKERS = 3;
  const partialMission = generatePartialMission(req, SIM_LENGTH, FRAMES / 120);
  const testOrbit = (elements) => {
    const offsets = {
      inclination: elements[0],
      rightAscension: elements[1],
      perigee: elements[2],
      meanAnomaly: elements[3],
      meanMotion: elements[4],
      eccentricity: elements[5],
      // meanMotionDot: elements[6],
      // bstar: elements[7],
    };

    try {
      createPowerSatellite('test', req.constellations[0].satellites[0].orbit, offsets, 'test');
    } catch (err) {
      const error = 'Orbital propagation failed';
      throw new Error(error);
    }
  };

  const randomFunction = async () => {
    let variables = randomOrbit();
    let success = false;
    while (!success) {
      try {
        testOrbit(variables);
        success = true;
      } catch (e) {
        variables = randomOrbit();
      }
    }
    const indices = Array.from(
      { length: req.constellations[0].spacePowersCount },
      () => Math.floor(Math.random() * req.constellations[0].satellites.length),
    );
    variables.push(...indices);
    return variables;
  };

  const generateMutation = (entity) => {
    const angleDrift = ((Math.random() - 0.5) * 2) * 3;
    const eccentricityDrift = ((Math.random() - 0.5) * 2) * 0.1;
    // const meanMotionDotDrift = ((Math.random() - 0.5) * 2) * 0.001;
    // const bstarDrift = ((Math.random() - 0.5) * 2) * 0.001;
    const indexDrift = Math.floor(((Math.random() - 0.5) * (req.constellations[0].length)));

    const i = Math.floor(Math.random() * entity.length);
    let newValue;
    const newEntity = [...entity];

    if (i < 5) {
      newValue = newEntity[i] + angleDrift;
      if (newValue > 360 || newValue < 0) newEntity[i] -= angleDrift;
      else newEntity[i] = newValue;
    } else if ((i === 5)) {
      newValue = newEntity[i] + eccentricityDrift;
      if (newValue > 1 || newValue < 0) newEntity[i] -= eccentricityDrift;
      else newEntity[i] = newValue;
    // } else if (i === 6) {
    //   newValue = newEntity[i] + meanMotionDotDrift;
    //   if (newValue > 1 || newValue < -1) newEntity[i] -= meanMotionDotDrift;
    //   else newEntity[i] = newValue;
    // } else if (i === 7) {
    //   newValue = newEntity[i] + bstarDrift;
    //   if (newValue > 2 || newValue < -2) newEntity[i] -= bstarDrift;
    //   else newEntity[i] = newValue;
    } else if (i > 5) {
      newValue = newEntity[i] + indexDrift;
      if (newValue > req.constellations[0].satellites.length
          || newValue < 0) newEntity[i] -= indexDrift;
      else newEntity[i] = newValue;
    }

    return newEntity;
  };

  const mutationFunction = async (entity) => {
    let mutation = generateMutation([...entity]);
    let success = false;
    while (!success) {
      try {
        testOrbit(mutation);
        success = true;
      } catch (e) {
        mutation = generateMutation([...entity]);
      }
    }
    return mutation;
  };

  const crossoverFunction = async (mother, father) => {
    // crossover via interpolation
    function lerp(a, b, p) {
      return a + (b - a) * p;
    }

    const i = Math.floor(Math.random() * 5);
    const r = Math.random();
    const son = [].concat(father);
    const daughter = [].concat(mother);

    son[i] = lerp(father[i], mother[i], r);
    daughter[i] = lerp(mother[i], father[i], r);
    return [son, daughter];
  };

  // const workers = new Set();
  // const promiseWorker = (testReq) => new Promise((resolve, reject) => {
  //   const worker = new Worker(new URL('./fitnessWorker.js', import.meta.url), { type: module });
  //   workers.add(worker);
  //   worker.postMessage({ messageType: 'Request', req: testReq });
  //   worker.onmessage = (e) => {
  //     if (e.data.done === true) {
  //       const { restMission } = e.data;
  //       const mission = {
  //         ...self.partialMission,
  //         ...restMission,
  //         satellites: {
  //           ...self.partialMission.satellites,
  //           ...restMission.satellites,
  //         },
  //       };
  //       const result = mission.constellations[0].summary.dischargeSaved;
  //       worker.terminate();
  //       workers.delete(worker);
  //       resolve(result);
  //     } else if (e.data.error) {
  //       worker.terminate();
  //       workers.delete(worker);
  //       reject(e.data.error);
  //     }
  //   };
  //   worker.onerror = (e) => {
  //     worker.terminate();
  //     workers.delete(worker);
  //     reject(e);
  //   };
  // });

  // const waitFor = (delay) => new Promise((resolve) => { setTimeout(resolve, delay); });
  const fitnessFunction = async (variables) => {
    const offsets = {
      inclination: variables[0],
      rightAscension: variables[1],
      perigee: variables[2],
      meanAnomaly: variables[3],
      meanMotion: variables[4],
      eccentricity: variables[5],
      // meanMotionDot: variables[6],
      // bstar: variables[7],
    };
    const spacePowerIndices = variables.slice(6);
    const testReq = {
      constellations: [
        {
          ...req.constellations[0],
          offsets,
          spacePowerIndices,
        },
      ],
    };
    let result;
    // try {
    //   while (workers.size >= NUM_WORKERS) {
    //     await waitFor(100);
    //   }
    //   console.log(workers);
    //   result = await promiseWorker(testReq);
    // } catch (e) {
    //   result = 0;
    // }
    try {
      const mission = handleOptimizerMission(partialMission, testReq);
      const { summary } = mission.constellations[0];
      result = summary.dischargeSaved + summary.lowestChargeStateBeams;
    } catch (e) {
      result = 0;
    }

    return { fitness: result };
  };

  const population = [];

  for (let i = 0; i < POPULATION; i++) {
    population.push(randomFunction());
  }

  const genetic = new Genetic({
    mutationFunction,
    // crossoverFunction,
    fitnessFunction,
    randomFunction,
    populationSize: POPULATION,
    fittestNSurvives: 1,
    select1: Select.Fittest,
    select2: Select.Tournament2,
    mutateProbablity: 1,
    // crossoverProbablity: 0.2,
    deduplicate: () => true,
  });

  const log = true;
  async function solve() {
    await genetic.seed();
    let best;
    for (let i = 0; i <= GENERATIONS; i++) {
      if (log) {
        console.count('gen');
      }

      await genetic.estimate();
      const bestOne = genetic.best()[0];
      best = genetic.best();

      if (log) {
        console.log(`${bestOne.entity} - ${bestOne.fitness}`);
      }

      await genetic.breed();
    }
    return best;
  }
  const result = await solve();
  const optimized = result[0].entity;
  return {
    offsets: {
      // ...req.constellation[0].offsets,
      inclination: optimized[0],
      rightAscension: optimized[1],
      perigee: optimized[2],
      meanAnomaly: optimized[3],
      meanMotion: optimized[4],
      eccentricity: optimized[5],
    },
    indices: optimized.slice(6),
  };
}

export default optimizeSpacePower;
