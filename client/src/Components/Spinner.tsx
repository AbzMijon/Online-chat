import React from "react";
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

const StyledSpinner = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #131014;
    .spinner__title {
        font-size: 30px;
        font-weight: bold;
        margin-right: 15px;
        color: #fff;
    }
`

function Spinner():JSX.Element {
    return (
        <StyledSpinner className='spinner'>
            <h3 className="spinner__title">Wait, almost loaded..</h3>
            <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="#fff" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </StyledSpinner>
    )
}

export default Spinner;