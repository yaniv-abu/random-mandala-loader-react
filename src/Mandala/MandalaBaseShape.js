import React from 'react';

export default function MandalaBaseShape({shapePathData, style}) {
    return <path d={shapePathData} style={style}/>;
}