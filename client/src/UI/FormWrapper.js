/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import shallow from 'zustand/shallow';
import { MissionSchema } from '../Model/mission';
import { useSimStore, useUIStore } from '../Model/store';
import { getCorsFreeUrl, loadTLEs } from '../Util/astronomy';
import { defaultValues } from '../Util/defaultInputs';
import SatelliteMenu from './SatelliteMenu';
import ConstellationConfig from './SatelliteMenu/Payload/ConstellationConfig';
import SatelliteConfig from './SatelliteMenu/Payload/SatelliteConfig';
import SpacePowerModal from './SatelliteMenu/SpacePower/SpacePowerModal';

function fetchTLEs(urls) {
  const tles = [];
  Object.entries(urls).forEach(([key, url]) => {
    loadTLEs(getCorsFreeUrl(url)).then((res) => {
      tles.push({
        name: key,
        tles: res,
      });
    });
  });
  return tles;
}

const urls = {
  OneWeb: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=oneweb&FORMAT=tle',
  Starlink: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle',
  Orbcomm: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=orbcomm&FORMAT=tle',
  Galileo: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=galileo&FORMAT=tle',
  Geosynchronous: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=geo&FORMAT=tle',
};

function FormWrapper() {
  const { setOrbitLists, setEditing } = useUIStore((state) => ({
    setOrbitLists: state.setOrbitLists,
    setEditing: state.setEditing,
  }), shallow);

  const { initializeMission, setInitialized, updateStatus } = useSimStore((state) => ({
    initializeMission: state.initializeMission,
    setInitialized: state.setInitialized,
    updateStatus: state.updateStatus,
  }), shallow);

  useEffect(() => {
    setOrbitLists((fetchTLEs(urls)));
  }, []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(MissionSchema),
  });

  const onSubmit = async (values) => {
    console.log(methods.formState.errors);
    setInitialized(false);
    const worker = new Worker(new URL('../Model/workers/missionWorker.js', import.meta.url), { type: module });
    worker.postMessage({ messageType: 'Request', req: values });
    worker.onmessage = (e) => {
      if (e.data.done === true) {
        const { mission } = e.data;
        initializeMission(mission);
        setEditing(false);
        worker.terminate();
      } else {
        updateStatus(e.data.message);
      }
      // initializeMission(values);
      // formik.setStatus('');
    };
  };

  // const onError = (errors, e) => console.log(errors, e);

  return (
    <FormProvider {...methods}>
      <form id="sim-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <SatelliteMenu />
        <SatelliteConfig />
        <ConstellationConfig />
        <SpacePowerModal />
      </form>
    </FormProvider>
  );
}

export default FormWrapper;
