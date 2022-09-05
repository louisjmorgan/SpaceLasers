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
    h4: {
      fontSize: '1rem',
      fontWeight: 'bold',
      padding: '0.5rem',
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

const textStyles = {
  number: {
    fontFamily: '"Azeret Mono", monospace',
  },
};

const components = {
  FormControl: {
    baseStyle: {
      width: "auto",
    },
  },
  Modal: {
    sizes: {
      xl: {
        dialog: {
          height: "auto",
          minWidth: "50vw",
        },
      },
    },
  },
};

const colors = {
  background: {
    100: 'hsl(276.9,41.9%,20%)',
    200: 'hsl(276.9,41.9%,10%)',
    300: 'hsl(276.9,41.9%,6.1%)',
  },
};

const theme = extendTheme({
  config, styles, fonts, layerStyles, textStyles, components, colors,
});

export default theme;
