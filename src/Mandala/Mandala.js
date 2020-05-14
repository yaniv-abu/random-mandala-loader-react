import React, { useState } from 'react';
import MandalaCircle from './MandalaCircle';
import './Mandala.css';

export default function RandomMandalaLoader({animate = true, clickToRegenerate = true}) {
    const setState = useState({})[1];
    const forceUpdate = () => {setState({})};
    const mandalaCirclesArray = generateMandalaCircles();
    if (animate) animateSpinningCircles(mandalaCirclesArray);
    let svgProps = {className: "mandala-svg"};
    if (clickToRegenerate)
        svgProps = {...svgProps, className: svgProps.className + " clickable", onClick: forceUpdate};
    return (<svg viewBox="0 0 100 100" {...svgProps}>
        <circle key="center" className="initial-circle" cx="50%" cy="50%" r="1%" />
        {mandalaCirclesArray}
    </svg>);
}

function generateMandalaCircles() {
    const circlesArray = [];
    let numOfShapesInCurrentCircle;
    let circleIndex = 0;
    let inBounds = true;
    while (inBounds) {
        const shapeBounds = getCircleBounds(circleIndex);
        if (shapeBounds) {
            numOfShapesInCurrentCircle = calcNewNumberOfShapes(numOfShapesInCurrentCircle, circleIndex);
            const circleProps = {numOfShapesInCurrentCircle, circleIndex, shapeBounds};
            const currentCircle = 
                <MandalaCircle {...circleProps} key={circleIndex} />
            circlesArray.push(currentCircle);
            circleIndex++;
        } else {
            inBounds = false;
        }
    }
    return circlesArray;
}

function getCircleBounds(circleIndex) {
    const startX = (50 - (circleIndex * (Math.random() * 4 + 8)));
    const targetX = (50 - ((circleIndex + 1) * (Math.random() * 4 + 8)));
    if (startX < 1 || targetX < 1) {
        return false;
    }
    else return {startX, targetX};
}

function calcNewNumberOfShapes(numOfShapesInPreviousCircle, circleIndex) {
    let numOfShapesInNextCircle;
    if (!numOfShapesInPreviousCircle) {
        numOfShapesInNextCircle = Math.round(Math.random() * 4 + 4);
    } else {
        const maxNumOfShapesInCurrentCircle = 8 * Math.pow((circleIndex), 2);
        const maxMultiplier = Math.floor(maxNumOfShapesInCurrentCircle / numOfShapesInPreviousCircle);
        const multiplyPreviousCircleBy = Math.round((Math.random() * (maxMultiplier - 1) + 1));
        numOfShapesInNextCircle = numOfShapesInPreviousCircle * multiplyPreviousCircleBy;    
    }
    return numOfShapesInNextCircle;
}

function animateSpinningCircles(circlesArray) {
    const numberOfSpinningCircles = Math.round((Math.random() * (circlesArray.length / 2) + 1));
    for (let i = 0; i < numberOfSpinningCircles; i++) {
        const style = {
            animationDuration: (Math.random() * 20 + 50) + 's',
            animationName: (Math.round(Math.random())) ? 'spin' : 'spin-reverse'
        };
        const randomIndex = Math.round(Math.random() * (circlesArray.length - 1));
        circlesArray[randomIndex] = React.cloneElement(circlesArray[randomIndex], {style});
    }
}