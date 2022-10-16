import React from "react";
import { useNavigate } from 'react-router-dom'; 
import { PATH } from '../constans/routes';
import styled from 'styled-components';
import { isServerError } from "../store/selectors/serverErrorSelectors";
import { useSelector } from "react-redux";
import GlobalServerError from "../HOC/GlobalServerError";

const StyledHome = styled.div `
    padding: 60px;
    margin: 0;
    position: relative;
    .home__title {
        color: #000;
        font-weight: bold;
        font-size: 50px;
        letter-spacing: 0.5px;
        text-align: center;
        margin-bottom: 40px;
    }
    .home__about {
        margin-bottom: 25px;
        text-align: center;
        color: #000;
    }
    .home__about-list {
        margin-bottom: 80px;
        color: #000;
    }
    .home__about-item {
        margin-bottom: 20px;
        font-size: 20px;
    }
    .form__btn-in {
        padding: 20px 25px;
        outline: none;
        font-size: 25px;
        border: none;
        background-color: #000;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        border-radius: 5px;
        transition: 0.1s ease-in-out;
        border: 1px solid transparent;
    }
    .form__btn-in:hover {
        transform: scale(1.1);
    }
    .home__navigate {
        text-align: center;
        margin: 75px 0 0 0;
    }
    .home__navigate-title {
        margin-bottom: 15px;
        color: #000;
    }
    .home__author {
        position: absolute;
        bottom: 25px;
        right: 25px;
        color: #3a3a3a;
    }
    .home__help {
        position: absolute;
        bottom: 25px;
        left: 25px;
        padding: 20px 25px;
        outline: none;
        font-size: 20px;
        border: none;
        background-color: #8a3131;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        border-radius: 5px;
        transition: 0.1s ease-in-out;
    }
    .home__help:hover {
        background-color: #a82c2c;
    }
`

function Home():JSX.Element {

    const navigate = useNavigate();
    const isError = useSelector(isServerError);

    if(isError) {
        return <GlobalServerError/>
    }

    return (
        <StyledHome>
            <h2 className="home__title">Добро пожаловать во всемирный онлайн чат!</h2>
            <h3 className="home__about">Про проект:</h3>
            <ul className="home__about-list">
                <li className="home__about-item">🤪Онлайн чат, в котором присутствует лишь одна комната со всеми людьми.</li>
                <li className="home__about-item">📜Общайтесь, выполняйте задания, получайте уровни профиля и будьте самым крутым в чате!</li>
                <li className="home__about-item">📈В зависимости от уровня профиля у вас появляются разные возможности.</li>
                <li className="home__about-item">👪Вы можете посмотреть всех участников онлайн чата, а так же менять конфигурации в пункте 'SETTINGS' влевой части экрана.</li>
                <li className="home__about-item">💻Если вам вдруг стало что-то непонятно или возникли трудности с чем либо - вы всегда можете обратиться в нашу службу поддержки и писать в любое время суток!</li>
                <li className="home__about-item">💰Станьте самым лучшим в нашем онлайн чате, удачи!</li>
            </ul>
            <div className="form__wrapper">
                <div className="home__navigate">
                    <h4 className="home__navigate-title">Ну что, вы готовы присоединиться к самому лучшему комьюнити?</h4>
                    <button className="form__btn-in" onClick={() => navigate(PATH.chat)}>Connect to room</button>
                </div>
            </div>
            <button className="home__help" type="button" onClick={() => navigate(PATH.support)}>Мне нужна помощь!</button>
            <p className="home__author">Автор проекта: @Abz_mijon</p>
        </StyledHome>
    )
};

export default Home;