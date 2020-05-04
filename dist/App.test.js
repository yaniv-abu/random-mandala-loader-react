import React from 'react';
import { render } from '@testing-library/react';
import MandalaLoader from './mandala';
test('renders mandala', () => {
  const mandala = render( /*#__PURE__*/React.createElement(MandalaLoader, null));
  expect(mandala.container.querySelector('g')).toBeDefined();
  expect(mandala.container.querySelector('circle')).toBeDefined();
});