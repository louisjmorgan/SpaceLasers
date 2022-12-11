/* eslint-disable quotes */
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
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
        borderColor: 'green.500',
        color: 'white',
      },
      solid: {
        color: 'white',
        textTransform: 'uppercase',
        backgroundColor: 'whiteAlpha.100',
        _hover: {
          backgroundColor: 'green.500',
        },
      },
      active: {
        color: 'white',
        backgroundColor: 'green.500',
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
    main: "#28D759",
    50: "#EAFBEE",
    100: "#C3F4D1",
    200: "#9CEDB3",
    300: "#76E595",
    400: "#4FDE77",
    500: "#28D759",
    600: "#20AC47",
    700: "#188136",
    800: "#105624",
    900: "#082B12",
  },
  accent: {
    50: "#28D759",
    100: "#28D759",
    200: "#28D759",
    300: "#28D759",
  },
};

const colorScheme = withDefaultColorScheme({
  colorScheme: 'accent',
  components: ['Switch', 'Tabs', 'Slider', 'Radio'],
});

const theme = extendTheme(colorScheme, {
  config, styles, fonts, layerStyles, textStyles, components, colors,
});

export default theme;
