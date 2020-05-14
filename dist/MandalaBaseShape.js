import React from 'react';
export default function MandalaBaseShape({
  shapePathData,
  style
}) {
  return /*#__PURE__*/React.createElement("path", {
    d: shapePathData,
    style: style
  });
}