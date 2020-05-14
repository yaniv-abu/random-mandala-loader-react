import React from 'react';
import MandalaBaseShape from './MandalaBaseShape';
export default function MandalaCircle({
  numOfShapesInCurrentCircle,
  circleIndex,
  shapeBounds,
  style = {}
}) {
  const shapesArray = [];
  const shapePathData = generateBaseShapePath(shapeBounds.startX, shapeBounds.targetX);

  for (let i = 1; i <= numOfShapesInCurrentCircle; i++) {
    const currentShapeRotation = 360 / numOfShapesInCurrentCircle * i;
    const rotationStyle = {
      transform: 'rotateZ(' + currentShapeRotation + 'deg)'
    };
    const shapeClone = /*#__PURE__*/React.createElement(MandalaBaseShape, {
      key: i,
      style: rotationStyle,
      shapePathData: shapePathData
    });
    shapesArray.push(shapeClone);
  }

  return /*#__PURE__*/React.createElement("g", {
    key: circleIndex,
    style: style
  }, shapesArray);
}
;

function generateBaseShapePath(startX, targetX) {
  const pathStartPoint = "M" + startX + " 50";
  const randomCurveSize = Math.random() * 15 + 5;
  const firstQuadCurve = "Q" + startX + " " + (50 - randomCurveSize) + " " + targetX + " 50";
  const secondQuadCurve = "Q" + startX + " " + (50 + randomCurveSize) + " " + startX + " 50";
  return pathStartPoint + " " + firstQuadCurve + " " + secondQuadCurve;
}