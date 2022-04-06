import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './styles/index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  pallette: {
    dRed: '#8D0801',
    rufous: '#A40606',
    khaki: '#BEB7A4',
    dGrey: '#5E5C6C',
    lGray: '#C9C8D0'
  }
};

const theme = extendTheme(colors);

render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);