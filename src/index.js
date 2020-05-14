import React from 'react';
import ReactDOM from 'react-dom';
import MandalaLoader from './Mandala/Mandala'

ReactDOM.render(
  <div style={{height: '80%'}}>
    <MandalaLoader />
    <h2>
      Live example for Random Mandala Lodaer.
    </h2>
    <h3>
      click on the mandala to generate a new random one.
    </h3>
  </div>,
  document.getElementById('root')
);