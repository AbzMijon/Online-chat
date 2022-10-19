import React from "react";
import { useNavigate } from 'react-router-dom'; 
import { PATH } from '../constans/routes';
import styled from 'styled-components';
import { isServerError } from "../store/selectors/serverErrorSelectors";
import { useSelector } from "react-redux";
import GlobalServerError from "../HOC/GlobalServerError";
import { BsFillPencilFill } from "react-icons/bs";
import { Formik, Form } from "formik";
import { loggedUserPassword } from "../store/selectors/userSelectors";

const StyledHome = styled.div `
    padding: 60px;
    margin: 0;
    position: relative;
    .home {
        background-color: #161b22;
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
        font-size: 15px;
        color: #8a3131;
        cursor: pointer;
        transition: 0.1s ease-in-out;
    }
`

function Home():JSX.Element {

    type initialNameValuesTypes = {
        newName: string,
    }
    type initialPasswordValuesTypes = {
        oldPassword: string,
        newPassword: string,
    }
    type formValuesTypes = {
        newName: string,
        oldPassword: string,
        newPassword: string,
    }
    type errorsObjTypes = {
        newName?: string,
        oldPassword?: string,
        newPassword?: string,
    }
    
    const navigate = useNavigate();
    const isError = useSelector(isServerError);
    const password = useSelector(loggedUserPassword);

    const initialNameValues:initialNameValuesTypes = {
        newName: '',
    }
    const initialPasswordValues:initialPasswordValuesTypes = {
        oldPassword: '',
        newPassword: '',
    }

    const validateForm = ((formValues:formValuesTypes) => {
        let isPassed = true;
        let errorsObj:errorsObjTypes = {};

        if(formValues.newName.length === 0) {
            isPassed = false;
            errorsObj.newName = 'Обязательное поле для заполнения!'
        }
        if(formValues.newName.length > 13) {
            isPassed = false;
            errorsObj.newName = 'Слишком длинное имя'
        }
        if(formValues.newPassword.length === 0) {
            isPassed = false;
            errorsObj.newPassword = 'Обязательное поле для заполнения!'
        }
        if(formValues.oldPassword !== password) {
            isPassed = false;
            errorsObj.oldPassword = 'Пароль не совпадает со старым!'
        }

        isPassed = false;
        if(!isPassed) return errorsObj;
    })


    if(isError) {
        return <GlobalServerError/>
    }

    return (
        <StyledHome>
            <div className="home">
                <header className="header">
                    <div className="home__photo">
                        <img src="#" alt="" className="home__icon" />
                        <BsFillPencilFill className="home__icon-pen"/>
                    </div>
                    <div className="home__main-info">
                        <p className="home__name"></p>
                        <p className="home__lvl">Уровень профиля:</p>
                    </div>
                    <p className="home__about"></p>
                </header>
                <main className="main">
                    <ul className="home__list">
                        <li className="home__list-item">
                            <Formik initialValues={initialNameValues} validate={validateForm} onSubmit={}>
                                <Form>
                                    <button className="home__change">Сменить имя</button>
                                    <div className="home__list-hidden">
                                        <input className="home__list-input" type="text" placeholder="Новое имя" />
                                        <button className="home__list-submit" type="submit">Изменить</button>
                                    </div>
                                </Form>
                            </Formik>
                        </li>
                        <li className="home__list-item">
                            <Formik initialValues={initialPasswordValues} validate={validateForm} onSubmit={}>
                                <Form>
                                    <button className="home__change">Сменить пароль</button>
                                    <div className="home__list-hidden">
                                        <input className="home__list-input" type="text" placeholder="Старый пароль" />
                                        <input className="home__list-input" type="text" placeholder="Новый пароль" />
                                        <button className="home__list-submit" type="submit">Изменить</button>
                                    </div>
                                </Form>
                            </Formik>
                        </li>
                    </ul>
                </main>
            </div>
            <p className="home__help" onClick={() => navigate(PATH.support)}>Мне нужна помощь!</p>
            <p className="home__author">Автор проекта: @Abz_mijon</p>
        </StyledHome>
    )
};

export default Home;