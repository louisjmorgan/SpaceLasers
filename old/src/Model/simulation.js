/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable default-case */

export default function dispatchSim(action, sim) {
  switch (action.type) {
    case 'add customer': {
      sim.current.customerRefs.set(action.name, action.ref);
      return;
    }

    case 'add power': {
      sim.current.powerRefs.set(action.name, action.ref);
      return;
    }

    case 'add beam': {
      sim.current.beamRefs.set(action.name, action.ref);
      return;
    }

    case 'attach camera': {
      sim.current.cameraTarget = {
        ...sim.current.cameraTarget,
        name: action.name,
        ref: sim.current.customerRefs.get(action.name),
      };
      return;
    }

    case 'detach camera': {
      sim.current.cameraTarget = {
        ...sim.current.cameraTarget,
        name: 'earth',
        ref: sim.current.earthRef.current,
      };
      return;
    }

    case 'set camera lock': {
      sim.current.cameraTarget = {
        ...sim.current.cameraTarget,
        lock: action.lock,
      };
    }
  }
}
