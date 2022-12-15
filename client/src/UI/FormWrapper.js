import { useFormik } from 'formik';
import { useEffect } from 'react';
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
  const { setOrbitLists, setEditing, isOpen } = useUIStore((state) => ({
    setOrbitLists: state.setOrbitLists,
    setEditing: state.setEditing,
    isOpen: state.isOpen,
  }), shallow);

  const { initializeMission, setInitialized } = useSimStore((state) => ({
    initializeMission: state.initializeMission,
    setInitialized: state.setInitialized,
  }), shallow);

  useEffect(() => {
    setOrbitLists((fetchTLEs(urls)));
  }, []);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: MissionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log(values.constellations);
      formik.setSubmitting(true);
      await new Promise((resolve, reject) => {
        setInitialized(false);
        try {
          initializeMission(values);
          formik.setStatus('');
          setEditing(false);
        } catch (error) {
          console.error(error);
          formik.setStatus(error.message);
          reject();
        }
        resolve();
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <SatelliteMenu formik={formik} />
      {isOpen.satelliteConfig ? <SatelliteConfig formik={formik} /> : ''}
      {isOpen.constellationConfig ? <ConstellationConfig formik={formik} /> : '' }
      {isOpen.spacePowerConfig ? <SpacePowerModal formik={formik} /> : '' }
    </form>
  );
}

export default FormWrapper;
