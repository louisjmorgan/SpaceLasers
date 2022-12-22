/* eslint-disable quotes */
import { createMultiStyleConfigHelpers, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { tabsAnatomy } from '@chakra-ui/anatomy';

const {
  definePartsStyle,
  defineMultiStyleConfig,
} = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const colorfulVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props; // extract colorScheme from component props

  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      color: 'whiteAlpha.500',
      _selected: {
        color: `text`,
        borderColor: 'whiteAlpha.500',
        borderBottomColor: 'background.300',

      },
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit",
    },
  };
});

const baseStyle = definePartsStyle((props) => {
  // define the part you're going to style
  // tab: {
  //   maxHeight: "100%",
  //   overflow: "auto", // change the font weight
  // },
  const { colorScheme: c } = props;
  console.log(c);
  return {
    root: {
      margin: 0,
      width: "100%",
    },
    tabpanels: {
      height: "100%",
      overflowY: "auto",
    },
    // tab: {
    //   color: 'green',
    //   _selected: {
    //     color: `text`,
    //   },
    // },
  };
});

export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { colorfulVariant },
  defaultProps: { variant: 'colorfulVariant', colorScheme: 'white' },
});

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('text', 'background.300')(props),
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
    bg: 'accent.blue',
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
          // height: "100%",
          width: "200ch",
          maxWidth: ["90vw", "80vw", "80vw", "80vw", "60vw"],

        },
        // container: {
        //   height: "80vw",
        // },
        body: {
          // height: "100%",
          overflow: "hidden",
        },
      },
    },
  },
  Button: {
    variants: {
      outline: {
        border: '2px solid',
        borderColor: 'text',
        color: 'text',
      },
      solid: {
        color: 'text',
        textTransform: 'uppercase',
        backgroundColor: 'whiteAlpha.100',
        _hover: {
          color: 'background.300',
          backgroundColor: 'text',
        },
      },
      active: {
        backgroundColor: 'accent.blue',
        color: 'text',
        textTransform: 'uppercase',
      },
    },
  },
  Drawer: {
    variants: {
      permanent: {
        dialog: {
          pointerEvents: 'auto',
        },
        dialogContainer: {
          pointerEvents: 'none',
        },
      },
    },
  },
  Tabs: tabsTheme,
  Popover: {
    baseStyle: {
      popper: {
        width: 'fit-content',
        maxWidth: 'fit-content',
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
  accent: {
    red: '#A4031F',
    blue: '#067BC2',
  },
  text: '#EDEDED',
  primary: {
    50: "#F2F2F2",
    100: "#DBDBDB",
    200: "#C4C4C4",
    300: "#ADADAD",
    400: "#969696",
    500: "#808080",
    600: "#666666",
    700: "#FDFDFD",
    800: "#333333",
    900: "#1A1A1A",
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
  tabs: {
    50: "#1A1A1A",
    100: "#1A1A1A",
    200: "#1A1A1A",
    300: "#EDEDED",
  },
};

const colorScheme = withDefaultColorScheme({
  colorScheme: 'primary',
  components: ['Switch', 'Slider', 'Radio'],
});

const theme = extendTheme(colorScheme, {
  config, styles, fonts, layerStyles, textStyles, components, colors,
});

export default theme;
