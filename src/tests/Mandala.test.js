import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RandomMandalaLoader from '../Mandala/Mandala';

test('renders mandala', () => {
  const mandala = render(<RandomMandalaLoader />);
  expect(mandala.container.querySelector('svg.mandala-svg')).toBeDefined();
  expect(mandala.container.querySelector('g')).toBeDefined();
  expect(mandala.container.querySelector('circle')).toBeDefined();
  expect(mandala.container.querySelector('path')).toBeDefined();
});

test('random numbers of circles and shapes per circle are in range', () => {
  for (let i = 0; i < 100; i++) {
    const mandala = render(<RandomMandalaLoader />);
    const [minNumOfCrircles, maxNumOfCircles] = [3, 7];
    const circles = mandala.container.getElementsByTagName('g');
    const numOfCircles = circles.length;
    expect(numOfCircles).toBeGreaterThan(minNumOfCrircles);
    expect(numOfCircles).toBeLessThan(maxNumOfCircles);
    for (let circleIndex = 0; circleIndex < numOfCircles; circleIndex++) {
      let minNumOfShapes, maxNumOfShapes;
      if (circleIndex == 0) {
        [minNumOfShapes, maxNumOfShapes] = [4,8];
      } else {
        const previousNumOfShapes = circles[circleIndex - 1].children.length;
        [minNumOfShapes, maxNumOfShapes] = [
          previousNumOfShapes,
          previousNumOfShapes * Math.floor(8 * Math.pow((circleIndex), 2) / previousNumOfShapes),
        ];
      }
      const numOfShapes = circles[circleIndex].children.length;
      expect(numOfShapes).toBeGreaterThanOrEqual(minNumOfShapes);
      expect(numOfShapes).toBeLessThanOrEqual(maxNumOfShapes);
    }
  }
});