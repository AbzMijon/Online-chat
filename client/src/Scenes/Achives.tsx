import React from "react";
import styled from 'styled-components';
import DailyReward from "../Components/Tasks/DailyReward";

const StyledAchives = styled.div `
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.fontColor};
    text-align: center;
    padding: 5px 50px;
    .achives__title {
        color: ${(props) => props.theme.fontColor};
    }
    .achives__list {
        margin-top: 55px;
    }
    .achives__item + .achives__item {
        margin-top: 35px;
    }
    .achives__item {
        padding: 15px 20px;
        border-radius: 5px;
        border: 1px solid ${(props) => props.theme.elemsBackground};
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .achives__name {
        font-weight: bold;
    }
    .achives__get-lvls {
        padding: 5px 10px;
        outline: none;
        background-color: transparent;
        border-radius: 5px;
        color: ${(props) => props.theme.fontColor};
        border-color: ${(props) => props.theme.elemsBackground};
        cursor: pointer;
        transition: 0.3s all;
    }
    .achives__get-lvls:hover {
        background-color: ${(props) => props.theme.fontColor};
        color: ${(props) => props.theme.changeFontColor};
    }
    .ahives__info {
        color: #ca9494;
        text-decoration: underline;
    } 
`

function Achives():JSX.Element {
    return (
        <StyledAchives>
            <h2 className="achives__title">Achives</h2>
            <p className="ahives__subtitle">Выполняйте задания и получайте уровни профиля!</p>
            <p className="ahives__info">Каждую неделю задания обновляются</p>
            <ul className="achives__list">
                <li className="achives__item">
                    <h5 className="achives__name">Ежежневная награда</h5>
                    <DailyReward/>
                    <button type="button" className="achives__get-lvls">Забрать</button>
                </li>
                <li className="achives__item">
                    <h5 className="achives__name">Пробыть 3 дня в чате</h5>
                    <button type="button" className="achives__get-lvls">Забрать</button>
                </li>
                <li className="achives__item">
                    <h5 className="achives__name">Написать 100 сообщений</h5>
                    <button type="button" className="achives__get-lvls">Забрать</button>
                </li>
                <li className="achives__item">
                    <h5 className="achives__name">Поменять аватарку в профиле</h5>
                    <button type="button" className="achives__get-lvls">Забрать</button>
                </li>
                <li className="achives__item">
                    <h5 className="achives__name">Попробовать светлую тему приложения</h5>
                    <button type="button" className="achives__get-lvls">Забрать</button>
                </li>
                <li className="achives__item">
                    <h5 className="achives__name">Пробыть 7 дней в чате</h5>
                    <button type="button" className="achives__get-lvls">Забрать</button>
                </li>
            </ul>
        </StyledAchives>
    )
};

export default Achives;