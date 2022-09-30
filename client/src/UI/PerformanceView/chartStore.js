import createVanilla from 'zustand/vanilla';

const useChartStore = createVanilla(() => ({
  context: null,
}));

export default useChartStore;
