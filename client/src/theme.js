/* eslint-disable quotes */
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('white', '#110916')(props),
      fontFamily: `'Barlow', sans-serif`,
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      padding: '2rem',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      padding: '1.5rem',
    },
  }),
};

const fonts = {
  fonts: {
    heading: `'Arial', sans-serif`,
    body: `'Barlow', sans-serif`,
  },
};

const layerStyles = {
  selected: {
    bg: 'rgba(255,255,255,0.1)',
  },
};

const components = {
  FormControl: {
    baseStyle: {
      width: "auto",
    },
  },
};

const theme = extendTheme({
  config, styles, fonts, layerStyles, components,
});

export default theme;
