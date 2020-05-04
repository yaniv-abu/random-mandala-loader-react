import React from 'react';
import { render } from '@testing-library/react';
import MandalaLoader from './mandala';

test('renders mandala', () => {
  const mandala = render(<MandalaLoader />);
  expect(mandala.container.querySelector('g')).toBeDefined();
  expect(mandala.container.querySelector('circle')).toBeDefined();
});
