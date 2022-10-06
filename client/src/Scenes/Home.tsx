import React from "react";
import { useNavigate } from 'react-router-dom'; 
import { PATH } from '../constans/routes';
import styled from 'styled-components';

const StyledHome = styled.div `
    
`

function Home():JSX.Element {

    const navigate = useNavigate();

    return (
        <StyledHome>
            <h2>Home</h2>
            <div className="form__wrapper">
                <div>
                    <button className="form__btn-in" onClick={() => navigate(PATH.chat)}>Connect to room</button>
                </div>
            </div>
        </StyledHome>
    )
};

export default Home;