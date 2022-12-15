import create from 'zustand';
import createVanilla from 'zustand/vanilla';
import { defaultConstellation } from '../Util/defaultInputs';
import { handleMissionRequest } from './mission';

const defaultOptions = {
  showLabel: false,
  isVisible: true,
};

const views = {
  simulation: {
    name: 'simulation',
    templateRows: '0.375fr 2.125fr 0.125fr',
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
    simulationArea: 'simulation',
    headerArea: '',
    footerArea: 'footer',
  },
};

const useFrameStore = createVanilla(() => ({
  frame: 0,
}));

const useSimStore = create((set) => ({
  isPaused: false,
  speed: 1,
  cameraTarget: {
    name: 'earth',
    ref: null,
    lock: true,
    id: null,
  },
  refs: new Map(),
  mission: null,
  isInitialized: false,
  satelliteObj: null,
  satelliteOptions: new Map(),
  constellationOptions: new Map(),
  storeObj: (obj) => set(() => ({ satelliteObj: obj })),
  setInitialized: (isInitialized) => set(() => ({ isInitialized })),
  setPaused: (isPaused) => set(() => ({ isPaused })),
  setSpeed: (speed) => set(() => ({ speed })),
  updateName: (id, name) => set((state) => {
    const prev = state.satelliteOptions.get(id);
    return ({
      satelliteOptions: new Map(state.satelliteOptions).set(id, {
        ...prev,
        name,
      }),
    });
  }),
  changeColor: (id, color) => set((state) => {
    const prev = state.satelliteOptions.get(id);
    return ({
      satelliteOptions: new Map(state.satelliteOptions).set(id, {
        ...prev,
        color,
      }),
    });
  }),
  toggleVisibility: (id) => set((state) => {
    const prev = state.satelliteOptions.get(id);
    return ({
      satelliteOptions: new Map(state.satelliteOptions).set(id, {
        ...prev,
        isVisible: !prev.isVisible,
      }),
    });
  }),
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
  toggleConstellationLabels: (id) => set((state) => {
    const prev = state.constellationOptions.get(id);
    const newSatelliteOptions = new Map(state.satelliteOptions);
    prev.satellites.forEach((satellite) => {
      const prevSat = state.satelliteOptions.get(satellite);
      newSatelliteOptions.set(satellite, {
        ...prevSat,
        showLabel: !prev.showLabel,
      });
    });
    return ({
      constellationOptions: new Map(state.constellationOptions).set(id, {
        ...prev,
        showLabel: !prev.showLabel,
      }),
      satelliteOptions: newSatelliteOptions,
    });
  }),
  changeConstellationColor: (id, color) => set((state) => {
    const prev = state.constellationOptions.get(id);
    const newSatelliteOptions = new Map(state.satelliteOptions);
    prev.satellites.forEach((satellite) => {
      const prevSat = state.satelliteOptions.get(satellite);
      newSatelliteOptions.set(satellite, {
        ...prevSat,
        color,
      });
    });
    return ({
      constellationOptions: new Map(state.constellationOptions).set(id, {
        ...prev,
        color,
      }),
      satelliteOptions: newSatelliteOptions,
    });
  }),
  toggleConstellationVisibility: (id) => set((state) => {
    const prev = state.constellationOptions.get(id);
    const newSatelliteOptions = new Map(state.satelliteOptions);
    prev.satellites.forEach((satellite) => {
      const prevSat = state.satelliteOptions.get(satellite);
      newSatelliteOptions.set(satellite, {
        ...prevSat,
        isVisible: !prev.isVisible,
      });
    });
    return ({
      constellationOptions: new Map(state.constellationOptions).set(id, {
        ...prev,
        isVisible: !prev.isVisible,
      }),
      satelliteOptions: newSatelliteOptions,
    });
  }),
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
  setLockCamera: (lock) => set((state) => ({
    cameraTarget: {
      ...state.cameraTarget,
      lock,
    },
  })),
  storeRef: (id, ref) => set((state) => ({ refs: new Map(state.refs).set(id, ref) })),
  initializeMission: (values) => set(() => {
    const mission = handleMissionRequest(values);
    const satellites = [...mission.satellites.customers, ...mission.satellites.spacePowers];
    const newSatelliteOptions = new Map();
    satellites.forEach((satellite) => {
      newSatelliteOptions.set(satellite.id, {
        ...defaultOptions,
        name: satellite.name,
        color: satellite.color,
        isCustomer: satellite.isCustomer,
      });
    });
    const newConstellationOptions = new Map(
      mission.constellations.map((constellation) => [constellation.id, {
        ...constellation,
        ...defaultOptions,
      }]),
    );
    return ({
      mission,
      satelliteOptions: newSatelliteOptions,
      constellationOptions: newConstellationOptions,
      isInitialized: true,
      cameraTarget: {
        name: 'earth',
        ref: null,
        lock: true,
        id: null,
      },
    });
  }),
}));

const useUIStore = create((set) => ({
  isOpen: {
    satellites: false,
    satelliteConfig: false,
    constellationConfig: false,
    spacePowerConfig: false,
    mission: false,
    HUD: true,
  },
  satIndex: 0,
  constellationIndex: 0,
  orbitLists: [],
  isEditing: false,
  isAdvanced: false,
  shouldLoop: false,
  isFinished: false,
  setLoop: (shouldLoop) => set(() => ({ shouldLoop })),
  setFinished: (isFinished) => set(() => ({ isFinished })),
  openMenu: (e) => set((state) => ({
    isOpen: {
      ...state.isOpen,
      HUD: e === 'HUD',
      [e]: true,
    },
  })),
  closeMenu: (e) => set((state) => ({
    isOpen: {
      ...state.isOpen,
      [e]: false,
    },
  })),
  setEditing: (e) => set(() => ({ isEditing: e })),
  setAdvanced: (e) => set(() => ({ isAdvanced: e })),
  setOrbitLists: (e) => set(() => ({ orbitLists: e })),
  setSatIndex: (e) => set(() => ({ satIndex: e })),
  setConstellationIndex: (e) => set(() => ({ constellationIndex: e })),

}));

export { useSimStore, useFrameStore, useUIStore };
