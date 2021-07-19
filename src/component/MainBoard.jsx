import React, { useEffect, useState, useRef } from 'react';
import { Row } from 'reactstrap';
import CommonHeader from './header/CommonHeader';
import Tab from './Tab';

  const MainBoard = () => {
      const canvasRef = useRef(null);
      const contextRef = useRef(null);

      const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2,2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    contextRef.current = context;
  }, []);

  const startDrawing = (nativeEvent) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    if(isDrawing) {
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  return (
    <React.Fragment>
      <Row>
        <CommonHeader />
        <Tab />
        <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        />
      </Row>
    </React.Fragment>

  )
}

export default MainBoard