/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import { Genetic, Select } from 'async-genetic';
import { spawn, Pool, Worker } from 'threads';
import { FRAMES, SIM_LENGTH } from '../Util/constants';
import {
  generatePartialMission, initializeSpacePowers,
} from './mission';
// import { twoline2satrec, generateTLE, getOrbitAtTime } from '../Util/astronomy';

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

async function* solve(genetic, GENERATIONS, log) {
  let generations = 0;
  await genetic.seed();
  let best;
  for (let i = 0; i <= GENERATIONS; i++) {
    if (log) {
      console.count('gen');
    }

    await genetic.estimate();
    const bestOne = genetic.best()[0];
    best = genetic.best();
    generations += 1;
    yield {
      best,
      generations,
    };
    if (log) {
      console.log(`${bestOne.entity} - ${bestOne.fitness}`);
    }

    await genetic.breed();
  }
  return { best, generations };
}

async function* optimizeSpacePower(req) {
  const constellation = req.constellations[0];
  const GENERATIONS = constellation.optimization.generations;
  const POPULATION = constellation.optimization.population;
  const partialMission = generatePartialMission(req, SIM_LENGTH, FRAMES / 120);
  const pool = Pool(async () => {
    const worker = await spawn(new Worker(new URL('./workers/fitnessWorker.js', import.meta.url)));
    worker.initialize(partialMission);
    return worker;
  }, constellation.optimization.threads);
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
      initializeSpacePowers([{
        ...constellation,
        offsets,
        spacePowerIndices: elements.slice(6),
      }]);
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
      { length: constellation.spacePowersCount },
      () => Math.floor(Math.random() * constellation.satellites.length),
    );
    variables.push(...indices);
    return variables;
  };

  const generateMutation = (entity) => {
    const angleDrift = ((Math.random() - 0.5) * 2) * 3;
    const eccentricityDrift = ((Math.random() - 0.5) * 2) * 0.1;
    // const meanMotionDotDrift = ((Math.random() - 0.5) * 2) * 0.001;
    // const bstarDrift = ((Math.random() - 0.5) * 2) * 0.001;
    const indexDrift = Math.floor((
      (Math.random() - 0.5) * (constellation.satellites.length)
    ));

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
      if (newValue >= constellation.satellites.length
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
          ...constellation,
          offsets,
          spacePowerIndices,
        },
      ],
    };

    const task = pool.queue((fitness) => fitness.calculate(testReq));
    const result = await task;
    // let result
    // try {
    //   const mission = handleOptimizerMission(partialMission, testReq);
    //   const { summary } = mission.constellations[0];
    //   result = summary.dischargeSaved + summary.lowestChargeStateBeams;
    // } catch (e) {
    //   result = 0;
    // }

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
    select2: Select.Tournament3,
    mutateProbablity: 1,
    // crossoverProbablity: 0.2,
    deduplicate: () => true,
  });

  const log = true;

  const gen = solve(genetic, GENERATIONS, log);
  let done = false;
  let result;
  while (!done) {
    result = await gen.next();
    done = result.done;
    if (done) break;
    yield result;
  }
  console.log(result);
  const optimized = result.value.best[0].entity;
  return {
    done: true,
    value: {
      ...result.value,
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
    },
  };
}

export default optimizeSpacePower;
