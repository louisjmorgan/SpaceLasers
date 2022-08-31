import { Vector3 } from 'three';
import create from 'zustand';
import createVanilla from 'zustand/vanilla';
import { handleMissionRequest } from './mission';

const defaultOptions = {
  showLabel: false,
};

const views = {
  simulation: {
    name: 'simulation',
    templateRows: '0.5fr 2fr 0.125fr',
    templateColumns: '1fr',
    templateAreas: '',
    simulationArea: ' 1 / 1 / 4 / 2',
    headerArea: ' 1 / 1 / 2 / 4',
    footerArea: '3 / 1 / 4 / 2',
  },
  mission: {
    name: 'mission',
    templateRows: '0.75fr 1.75fr 0.125fr',
    templateColumns: '1fr 2.25fr',
    templateAreas: `"simulation parameters"
  "select parameters"
  "footer footer"`,
    simulationArea: 'simulation',
    headerArea: '',
    footerArea: 'footer',
  },
  performance: {
    name: 'performance',
    templateRows: '1fr 1.5fr 0.125fr',
    templateColumns: '1fr 2fr',
    templateAreas: `"simulation performance"
  "summary performance"
  "footer footer"`,
  },
};

const useFrameStore = createVanilla(() => ({
  frame: 0,
}));

const useStore = create((set) => ({
  isPaused: false,
  speed: 1,
  cameraTarget: {
    name: 'earth',
    ref: null,
    lock: true,
    id: null,
  },
  refs: new Map(),
  satelliteOptions: new Map(),
  view: views.simulation,
  mission: null,
  togglePaused: () => set((state) => ({ isPaused: !state.isPaused })),
  setSpeed: (speed) => set(() => ({ speed })),
  attachCamera: (id) => set((state) => ({
    cameraTarget: {
      ...state.cameraTarget,
      ref: state.refs.get(id),
      id,
      name: state.satelliteOptions.get(id).name,
    },
  })),
  detachCamera: () => set((state) => ({
    cameraTarget: {
      ...state.cameraTarget,
      name: 'earth',
      ref: null,
      id: null,
    },
  })),
  toggleLabel: (id) => set((state) => {
    const prev = state.satelliteOptions.get(id);
    return ({
      satelliteOptions: new Map(state.satelliteOptions).set(id, {
        ...prev,
        showLabel: !prev.showLabel,
      }),
    });
  }),
  toggleAllLabels: (shouldShow) => set((state) => {
    const newOptions = new Map(state.satelliteOptions);
    if (!shouldShow) {
      newOptions.forEach(
        (value, key) => newOptions.set(key, { ...value, showLabel: false }),
      );
    } else {
      newOptions.forEach(
        (value, key) => newOptions.set(key, { ...value, showLabel: true }),
      );
    }
    return ({
      satelliteOptions: newOptions,
    });
  }),
  setLockCamera: (lock) => set((state) => ({
    cameraTarget: {
      ...state.cameraTarget,
      lock,
    },
  })),
  storeRef: (id, ref) => set((state) => ({ refs: new Map(state.refs).set(id, ref) })),
  initializeMission: (values) => set(() => {
    set(() => ({ mission: null }));
    const mission = handleMissionRequest(values);
    const satellites = [...mission.satellites.customers, ...mission.satellites.spacePowers];
    const newOptions = new Map();
    satellites.forEach((satellite) => {
      newOptions.set(satellite.id, {
        ...defaultOptions,
        name: satellite.name,
        color: satellite.isCustomer ? 'red' : 'yellow',
      });
    });
    return ({
      mission,
      satelliteOptions: newOptions,
    });
  }),
  setView: (view) => set(() => ({ view: views[`${view}`] })),
}));

export { useStore, useFrameStore };
