import React, { useState } from 'react';
import './MandalaLoader.css';

export default function MandalaLoader() {
    const [clickCount, setClickCount] = useState(0);
    const forceUpdate = () => {setClickCount(clickCount + 1)};
    return (<svg className="mandala-svg" viewBox="0 0 100 100" onClick={forceUpdate}>
        <circle key="center" className="initial-circle" cx="50%" cy="50%" r="1%" />
        <MandalaCircles />
    </svg>);
}

function MandalaCircles() {
    const circlesArray = [];
    let numOfShapesInCurrentCircle = Math.round(Math.random() * 4 + 4);
    for (let i = 0; i < 10; i++) {
        const currentCircle = circleCreator(numOfShapesInCurrentCircle, i + 1);
        if (currentCircle) circlesArray.push(currentCircle);
        else break;
        numOfShapesInCurrentCircle = numOfShapesInCurrentCircle * Math.round((Math.random() * 1.5 + 1));
        if (numOfShapesInCurrentCircle > 10 && numOfShapesInCurrentCircle % 2 === 0)
            numOfShapesInCurrentCircle = numOfShapesInCurrentCircle / Math.round((Math.random() * 1 + 1));
    }
    const numberOfSpinningCircles = Math.round((Math.random() * (circlesArray.length / 2) + 1));
    for (let i = 0; i < numberOfSpinningCircles; i++) {
        const style = {animationDuration: (Math.random() * 50 + 20) + 's', animationName: (Math.round(Math.random())) ? 'spin' : 'spin-reverse'};
        const randomIndex = Math.round(Math.random() * (circlesArray.length - 1));
        circlesArray[randomIndex] = <g {...(circlesArray[randomIndex].props)} key={circlesArray[randomIndex].key} style={style} />;
    }
    return circlesArray;
}

const circleCreator = function (numberOfShapesInCircle, circleNumber) {
    const shapesArray = [];
    const startX = (50 - ((circleNumber - 1) * 10 * (Math.random() * 0.4 + 0.8)));
    const targetX = (50 - ((circleNumber) * 10 * (Math.random() * 0.4 + 0.8)));
    if (targetX < 1 || targetX > 99) {
        return false;
    }
    const M = "M" + startX + " 50";
    const randomCurve = Math.random() * 15 + 5;
    const Q1 = "Q" + startX + " " + (50 - randomCurve) + " " + targetX + " 50";
    const Q2 = "Q" + startX + " " + (50 + randomCurve) + " " + startX + " 50";
    for (let i = 0; i < numberOfShapesInCircle; i++) {
        const shapeRotate = (360 / numberOfShapesInCircle) * i;
        shapesArray.push(
            <path key={i} d={M + " " + Q1 + " " + Q2} style={{transform: 'rotateZ(' + shapeRotate + 'deg)'}} />
        );
    }
    return <g key={circleNumber}>{shapesArray}</g>;
};