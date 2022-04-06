import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './styles/index.css';

const colors = {
  pallette: {
    dRed: '#8D0801',
    rufous: '#A40606',
    khaki: '#BEB7A4',
    dGrey: '#5E5C6C',
    lGray: '#C9C8D0'
  }
};

render(
  <App />,
  document.getElementById('root')
);