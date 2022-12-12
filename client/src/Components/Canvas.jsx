import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledCanvas = styled.div `
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .canvas {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        flex-direction: column;
        z-index: 10;
    }
    #canvas {
        border: 1px solid #000;
        background-color: #fff;
        border-radius: 5px 5px 0 0;
        &:hover {
            cursor: crosshair;
        }
    }
    .canvas__color {
        cursor: pointer;
    }
    .canvas__tools {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 5px;
        border-radius: 0 0 5px 5px;
    }
`

function Canvas() {

    const [color, setColor] = useState('');
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    
    /* let img = canvasRef.current.getImageScaledToCanvas(); */
    
    useEffect(() => {   
        const canvas = canvasRef.current;

        console.log(canvas.toDataURL("image/jpeg|png|jpg"));

        const context = canvas.getContext('2d');
        contextRef.current = context;
    }, []);
    console.log(color);
    useMemo(() => {
        contextRef.strokeStyle = color;
    }, [color]);
    
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = ({ nativeEvent }) => {
        if (isDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    }

    return (
        <StyledCanvas>
            <div className='canvas'>
                <canvas
                    id='canvas'
                    width='600px'
                    height='500px'
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}>
                </canvas>
                <div className="canvas__tools">
                    <button type='button' className='canvas__delete'>Стереть все</button>
                    <input type="color" className='canvas__color' value={color} onChange={(e) => setColor(e.target.value)} />
                    <button type='button' className='canvas__send'>Отправить</button>
                </div>
            </div>
        </StyledCanvas>
    )
}

export default Canvas