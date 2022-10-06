import React from "react";
import { useSelector } from "react-redux";
import { isServerError } from "../store/selectors/serverErrorSelectors";
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

function GlobalServerError(props: { children: any; }):JSX.Element {
    const message = useSelector(serverErrorMessage);
    const isError = useSelector(isServerError);
    return (
        <React.Fragment>
            {isError 
                ? 
                    <StyledGlobalServerError className='response-error'>
                        <h2 className='response-error__title'>{message}</h2>
                        <img src={serverError} alt='' />
                    </StyledGlobalServerError>
                :
                    props.children
            }
        </React.Fragment>
            
    )
}

export default GlobalServerError;