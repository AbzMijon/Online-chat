import React from "react";
import { useNavigate } from 'react-router-dom'; 
import { PATH } from '../constans/routes';
import styled from 'styled-components';

const StyledHome = styled.div `
    padding: 20px 50px;
    margin: 0;
    background: linear-gradient(45deg, black, transparent);
    .home__title {
        color: #000;
        font-weight: bold;
        font-size: 30px;
        letter-spacing: 0.5px;
    }
`

function Home():JSX.Element {

    const navigate = useNavigate();

    return (
        <StyledHome>
            <h2 className="home__title">Добро пожаловать во всемирный онлайн чат!</h2>
            <div className="form__wrapper">
                <div className="home__navigate">
                    <h4 className="home__navigate-title">Ну что, вы готовы присоединиться к самому лучшему комьюнити?</h4>
                    <button className="form__btn-in" onClick={() => navigate(PATH.chat)}>Connect to room</button>
                </div>
            </div>
        </StyledHome>
    )
};

export default Home;