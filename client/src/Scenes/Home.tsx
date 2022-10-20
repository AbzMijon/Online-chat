import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { PATH } from '../constans/routes';
import styled from 'styled-components';
import { isServerError } from "../store/selectors/serverErrorSelectors";
import { useSelector } from "react-redux";
import GlobalServerError from "../HOC/GlobalServerError";
import { BsFillPencilFill } from "react-icons/bs";
import { Formik, Form } from "formik";
import { loggedUserPassword } from "../store/selectors/userSelectors";
import ChangeNameFormikInput from "../Components/FormikInputs/home/changeNameFormikInput";
import ChangePassFormikInput from "../Components/FormikInputs/home/ChangePassFormikInput";
import defaultAvatar from '../assets/img/defaultAvatar.jpg'
import { loggedUserName } from "../store/selectors/userSelectors";

const StyledHome = styled.div `
    padding: 60px;
    margin: 0;
    background-color: #161b22;
    position: relative;
    .home {
        padding: 20px 80px;
        height: 100%;
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
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .home__photo {
        width: 250px;
        height: 250px;
        position: relative;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.1s all;
        margin-right: 15px;
        z-index: 2;
    }
    .home__icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .home__photo:hover .home__icon {
        filter: grayscale(1);
    }
    .home__icon-pen {
        position: absolute;
        bottom: 35px;
        right: 35px;
        border-radius: 50%;
        border: 1px solid #fff;
        width: 25px;
        height: 25px;
        padding: 5px;
        font-size: 20px;
    }
    .home__change-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        font-size: 13px;
        font-weight: bold;
        color: #9b4e4e;
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
    const [changeName, setChangeName] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const userName = useSelector(loggedUserName);
    const [changeTitle, setChangeTitle] = useState(false);

    const initialNameValues:initialNameValuesTypes = {
        newName: '',
    }
    const initialPasswordValues:initialPasswordValuesTypes = {
        oldPassword: '',
        newPassword: '',
    }

    const validateForm = ((formValues:formValuesTypes): void | errorsObjTypes => {        
        let isPassed = true;
        let errorsObj:errorsObjTypes = {};

        if(changeName && !formValues.newName.length) {
            isPassed = false;
            errorsObj.newName = 'Обязательное поле для заполнения!'
        }
        if(changeName && formValues.newName.length > 13) {
            isPassed = false;
            errorsObj.newName = 'Слишком длинное имя'
        }
        if(changePass && !formValues.newPassword.length) {
            isPassed = false;
            errorsObj.newPassword = 'Обязательное поле для заполнения!'
        }
        if(changePass && !formValues.oldPassword.length) {
            isPassed = false;
            errorsObj.oldPassword = 'Обязательное поле для заполнения!'
        }
        if(changePass && formValues.oldPassword !== password) {
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
                    <div className="home__photo" onMouseLeave={() => setChangeTitle(false)} onMouseOver={() => setChangeTitle(true)}>
                        <img src={defaultAvatar} alt="" className="home__icon" />
                        <BsFillPencilFill className="home__icon-pen"/>
                        {changeTitle && <h5 className="home__change-title">Сменить аватарку</h5>}
                    </div>
                    <div className="home__main-info">
                        <p className="home__name">Имя: {userName}</p>
                        <p className="home__lvl">Уровень профиля:</p>
                    </div>
                    <p className="home__about"></p>
                </header>
                <main className="main">
                    <ul className="home__list">
                        <li className="home__list-item">
                            <Formik initialValues={initialNameValues} validate={validateForm} onSubmit={(formValues: any) => {
                                console.log(formValues);
                            }}>
                                <Form>
                                    <button type="button" className="home__change" onClick={() => {
                                        setChangeName(!changeName)
                                        setChangePass(false);
                                    }}>Сменить имя</button>
                                    {changeName &&
                                        <div className="home__list-hidden">
                                            <ChangeNameFormikInput name='newName' className="home__list-input" type="text" placeholder="Новое имя" />
                                            <button className="home__list-submit" type="submit">Изменить</button>
                                        </div>
                                    }
                                </Form>
                            </Formik>
                        </li>
                        <li className="home__list-item">
                            <Formik initialValues={initialPasswordValues} validate={validateForm} onSubmit={(formValues: any) => {
                                console.log(formValues);
                            }}>
                                <Form>
                                    <button type="button" className="home__change" onClick={() => {
                                        setChangePass(!changePass);
                                        setChangeName(false);
                                    }}>Сменить пароль</button>
                                    {changePass &&
                                        <div className="home__list-hidden">
                                            <ChangePassFormikInput name='oldPassword' className="home__list-input" type="text" placeholder="Старый пароль" />
                                            <ChangePassFormikInput name='newPassword' className="home__list-input" type="text" placeholder="Новый пароль" />
                                            <button className="home__list-submit" type="submit">Изменить</button>
                                        </div>
                                    }
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