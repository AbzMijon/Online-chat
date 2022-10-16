import React from "react";
import { useSelector } from "react-redux";
import { serverErrorMessage } from "../store/selectors/serverErrorSelectors";
import serverError from '../assets/img/serverError.png';
import styled from 'styled-components';

const StyledGlobalServerError = styled.div `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .response-error__title {
        margin-bottom: 15px;
        font-size: 25px;
        color: #000;
    }
`

function GlobalServerError():JSX.Element {
    const message = useSelector(serverErrorMessage);
    return (
        <React.Fragment>
            <StyledGlobalServerError className='response-error'>
                <h2 className='response-error__title'>{message}</h2>
                <img src={serverError} alt='' />
            </StyledGlobalServerError>
        </React.Fragment>
    )
}

export default GlobalServerError;