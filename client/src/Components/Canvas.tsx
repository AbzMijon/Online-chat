import React, { FC, useState } from 'react';
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
    }
    #canvas {
        border: 1px solid #000;
        background-color: #fff;
        border-radius: 5px;
        &:hover {
            cursor: crosshair;
        }
    }
    .canvas__color {
        position: absolute;
        bottom: 10px;
        left: 10px;
        cursor: pointer;
    }
`

function Canvas():JSX.Element {

    const [color, setColor] = useState<string>('');

    return (
        <StyledCanvas>
            <div className='canvas'>
                <canvas id='canvas' width='700px' height='500px'></canvas>
                <input type="color" className='canvas__color' value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
        </StyledCanvas>
    )
}

export default Canvas