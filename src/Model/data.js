/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
/* eslint-disable no-fallthrough */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { format } from 'date-fns';

const defaultData = {
  isCustomer: false,
  showLabel: false,
  chargeState: 0.3,
  currentDuty: 'power storing',
  chargeSources: 'eclipsed',
  logs: {
    chargeStateBeam: [],
    chargeStateNoBeam: [],
    currentDuty: [],
    chargeSources: [],
  },
};

export default function dispatchData(action, data) {
  switch (action.type) {
    case 'add satellite': {
      data.current.set(action.name, {
        ...defaultData,
        isCustomer: action.isCustomer,
      });
      return;
    }

    case 'remove satellite': {
      data.current.delete(action.name);
      return;
    }

    case 'remove all': {
      data.current.forEach((sat, name) => {
        if (sat.isCustomer === action.isCustomer) {
          data.current.delete(name);
        }
      });
      return;
    }

    case 'toggle label': {
      const prev = data.current.get(action.name);
      data.current.set(action.name, {
        ...prev,
        showLabel: !prev.showLabel,
      });
      return;
    }

    // case 'calculate averages': {
    //   Object.keys(data.current.get('averages')).forEach((param) => {
    //     let average = 0;
    //     let total = 0;
    //     data.current.forEach((satellite, name) => {
    //       if (name === 'averages' || !satellite.isCustomer) return;
    //       console.log(
    //         name,
    //         satellite.logs[param][satellite.logs[param].length - 1].x
    //       );
    //       average +=
    //         satellite.logs[param][satellite.logs[param].length - 1].y;

    //       total += 1;
    //     });
    //     average /= total;
    //     data.current
    //       .get('averages')
    //       [param].push({ x: action.time, y: average });
    //   });
    //   return;
    // }

    case 'update charge state': {
      const prev = data.current.get(action.name);
      data.current.set(action.name, {
        ...prev,
        chargeStateBeam: action.chargeStateBeam,
        chargeStateNoBeam: action.chargeStateNoBeam,
        logs: {
          ...prev.logs,
          chargeStateBeam: [
            ...prev.logs.chargeStateBeam,
            {
              x: format(action.time, 'PPpp'),
              y: +action.chargeStateBeam,
            },
          ],
          chargeStateNoBeam: [
            ...prev.logs.chargeStateNoBeam,
            {
              x: format(action.time, 'PPpp'),
              y: +action.chargeStateNoBeam,
            },
          ],
        },
      });
      return;
    }

    case 'update current duty': {
      const prev = data.current.get(action.name);
      data.current.set(action.name, {
        ...prev,
        currentDuty: action.currentDuty,
      });
      return;
    }

    case 'update charging': {
      const prev = data.current.get(action.name);
      data.current.set(action.name, {
        ...prev,
        chargeSources: action.sources,
      });
      return;
    }
  }
}
