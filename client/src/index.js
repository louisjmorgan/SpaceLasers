import { ColorModeScript } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './theme';

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>,
);
