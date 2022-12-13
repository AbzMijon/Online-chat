import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsFillEraserFill } from 'react-icons/bs';
import { BiPaint } from 'react-icons/bi';

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
        width: 100%;
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
    .canvas__tool {
        padding: 3px;
        font-size: 15px;
        font-weight: bold;
        border: 1px solid #000;
    }
    .canvas__tool + .canvas__tool {
        margin-left: 5px;
    }
`

function Canvas({ canvasVisible, setCanvasVisible, image, setImage }) {

    const [color, setColor] = useState('');
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    
    useEffect(() => {   
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
    }, []);
    

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if(color) {
            context.strokeStyle = color;
        }
    }, [color]);
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    const sendImage = () => {
        const canvas = canvasRef.current;
        const canvasImg = canvas.toDataURL("image/jpeg|png|jpg");
        setImage(canvasImg);
        setCanvasVisible(false);
        clearCanvas();
    }

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

    const setDraw = () => {
        contextRef.current.globalCompositeOperation = 'source-over';
    }

    const setErase = () => {
        contextRef.current.globalCompositeOperation = 'destination-out';
    }

    const draw = ({ nativeEvent }) => {
        if (isDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    }


    return (
        <StyledCanvas style={{display: `${canvasVisible === true ? 'flex' : 'none'}`}}>
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
                    <button type='button' className='canvas__delete' onClick={clearCanvas}>Стереть все</button>
                    <div className="canvas__draw-and-erase">
                        <button type='button' className='canvas__tool' onClick={setDraw}><BiPaint /></button>
                        <button type='button' className='canvas__tool' onClick={setErase}><BsFillEraserFill /></button>
                    </div>
                    <input type="color" className='canvas__color' value={color} onChange={(e) => setColor(e.target.value)} />
                    <button type='button' className='canvas__send' onClick={sendImage}>Прикрепить к сообщению</button>
                </div>
            </div>
        </StyledCanvas>
    )
}

export default Canvas