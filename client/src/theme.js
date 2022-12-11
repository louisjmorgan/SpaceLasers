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
      bg: mode('white', 'rgb(22,22,22)')(props),
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
      // padding: '1.5rem',
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
          minWidth: "60vw",
        },
      },
    },
  },
  Button: {
    variants: {
      outline: {
        border: '2px solid',
        borderColor: 'green.100',
        color: 'white',
      },
      solid: {
        color: 'white',
        padding: '1.5rem',
        textTransform: 'uppercase',
        _hover: {
          backgroundColor: 'green.100',
        },
      },
      active: {
        color: 'white',
        padding: '1.5rem',
        backgroundColor: 'green.100',
        textTransform: 'uppercase',
      },
    },
  },
};

const colors = {
  background: {
    100: 'rgba(22,22,22,0.5)',
    200: 'rgba(22,22,22,0.9)',
    300: 'rgba(22,22,22,1)',
  },
  green: {
    100: '#28d659',
  },
};

const theme = extendTheme({
  config, styles, fonts, layerStyles, textStyles, components, colors,
});

export default theme;
