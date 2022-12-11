import { useFormik } from 'formik';
import { useEffect } from 'react';
import { MissionSchema } from '../Model/mission';
import { useSimStore, useUIStore } from '../Model/store';
import { getCorsFreeUrl, loadTLEs } from '../Util/astronomy';
import { defaultValues } from '../Util/defaultInputs';
import SatelliteMenu from './SatelliteMenu';
import SatelliteConfig from './SatelliteMenu/SatelliteConfig';

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
  const setConstellations = useUIStore((state) => state.setConstellations);

  const { initializeMission, setInitialized } = useSimStore((state) => ({
    initializeMission: state.initializeMission,
    setInitialized: state.setInitialized,
  }));

  useEffect(() => {
    setConstellations((fetchTLEs(urls)));
  }, []);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: MissionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      await new Promise((resolve, reject) => {
        setInitialized(false);
        setTimeout(() => {
          try {
            initializeMission(values);
            formik.setStatus('');
          } catch (error) {
            console.log(error.message);
            formik.setStatus(error.message);
            reject();
          }
          resolve();
        }, 500);
      });
    },
  });

  console.log(formik.errors);

  return (
    <form onSubmit={formik.handleSubmit}>
      <SatelliteMenu formik={formik} />
      <SatelliteConfig formik={formik} />
    </form>
  );
}

export default FormWrapper;
