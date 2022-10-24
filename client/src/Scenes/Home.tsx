import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { PATH } from '../constans/routes';
import styled from 'styled-components';
import { isServerError } from "../store/selectors/serverErrorSelectors";
import { useSelector } from "react-redux";
import GlobalServerError from "../HOC/GlobalServerError";
import { BsFillPencilFill } from "react-icons/bs";
import { Formik, Form } from "formik";
import { loggedUserId } from "../store/selectors/userSelectors";
import ChangeNameFormikInput from "../Components/FormikInputs/home/changeNameFormikInput";
import ChangePassFormikInput from "../Components/FormikInputs/home/ChangePassFormikInput";
import defaultAvatar from '../assets/img/defaultAvatar.jpg'
import { fetchUsers } from "../api/users";
import Spinner from '../Components/Spinner';
import ChangeAboutFormikInput from "../Components/FormikInputs/home/ChangeAboutFormikInput";
import { fetchUserChangeName, fetchUserChangePass, fetchUserChangeAbout } from "../api/users";
import DeleteAccTry from "../Components/DeleteAccTry";
import { userlvlColor } from "../helpers/userlvlColor";
import { initialNameValuesTypes, initialPasswordValuesTypes, initialAboutValuesTypes, userTypes } from './Home/types';
import { validateForm } from "./Home/validateForm";

const StyledHome = styled.div `
    overflow: auto;
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
        justify-content: left;
        align-items: center;
        margin-bottom: 15px;
    }
    .home__about {
        margin-bottom: 35px;
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
        transition: 0.3s all;
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
    .home__about-title {
        font-size: 20px;
        margin-bottom: 8px;
    }
    .titles {
        color: #a5a5a5;
    }
    .home__list {
        width: 100%;
    }
    .home__list-item {
        width: 100%;
        padding: 10px 0px;
    }
    .home__change, .home__change--active {
        padding: 5px 15px;
        border: none;
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        border-radius: 5px;
        background-color: #dadada;
        cursor: pointer;
        transition: 0.3s ease-out;
        margin-bottom: 10px;
    }
    .home__change:hover {
        transform: scaleY(1.1);
        background-color: #dadadab0;
    }
    .home__change--active {
        color: #8a3131;
    }
    .home__list-input {
        padding: 5px 15px;
        border: none;
        outline: none;
        font-size: 15px;
        font-weight: bold;
    }
    .home__list-input {
        margin-bottom: 5px;
        border-radius: 3px;
    }
    .home__list-submit {
        cursor: pointer;
    }
    .home__change-warning {
        text-align: center;
        margin-top: 20px;
        color: #a86b6b;
    }
    .delete-btn {
        padding: 10px 15px;
        border: none;
        outline: none;
        font-size: 17px;
        color: #fff;
        background-color: #8a3131;
        cursor: pointer;
        transition: 0.2s all;
        border-radius: 2px;
    }
    .delete-btn:hover {
        background-color: #6d2121;
    }
    .delete-btn__wrap {
        margin: 40px 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
    }
`

function Home():JSX.Element {
    
    const navigate = useNavigate();
    const isError = useSelector(isServerError);
    const userId = useSelector(loggedUserId);
    const [changeName, setChangeName] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [changeAbout, setChangeAbout] = useState(false);
    const [userName, setUserName] = useState('');
    const [changeTitle, setChangeTitle] = useState(false);
    const [aboutText, setAboutText] = useState('');
    const [userLvl, setUserLvl] = useState(null);
    const [handleDeleteAcc, setHandleDeleteAcc] = useState(false);

    const initialNameValues:initialNameValuesTypes = {
        newName: '',
    }
    const initialPasswordValues:initialPasswordValuesTypes = {
        newPassword: '',
    }
    const initialAboutValues: initialAboutValuesTypes = {
        about: '',
    }

    useEffect(() => {
        fetchUsers().then(response => {
            const thisUser = response.data.find((user: userTypes) => {                
                return user.id === userId;
            })
            setAboutText(thisUser.about);
            setUserLvl(thisUser.level);
            setUserName(thisUser.name);
        })
    }, []);

    if(isError) {
        return <GlobalServerError/>
    }
    if(!aboutText.length && userLvl === null) {
        return <Spinner/>
    }

    return (
        <StyledHome>
            {handleDeleteAcc&& 
                <DeleteAccTry setHandleDeleteAcc={setHandleDeleteAcc} userId={userId}/>
            }
            <div className="home">
                <header className="header">
                    <div className="home__photo" onMouseLeave={() => setChangeTitle(false)} onMouseOver={() => setChangeTitle(true)} style={{border: `3px solid ${userlvlColor(userLvl)}`, boxShadow: `0 0 40px ${userlvlColor(userLvl)}`}}>
                        <img src={defaultAvatar} alt="" className="home__icon" />
                        <BsFillPencilFill className="home__icon-pen"/>
                        {changeTitle && <h5 className="home__change-title">Сменить аватарку</h5>}
                    </div>
                    <div className="home__main-info">
                        <p className="home__name"><span className="titles">Имя:</span> {userName}</p>
                        <p className="home__lvl"><span className="titles">Уровень профиля:</span> {userLvl}</p>
                    </div>
                </header>
                    <h4 className="home__about-title titles">Информация о себе:</h4>
                    <p className="home__about">{aboutText}</p>
                <main className="main">
                    <ul className="home__list">
                        <li className="home__list-item">
                            <Formik initialValues={initialNameValues} validate={validateForm} onSubmit={(formValues: any) => {
                                fetchUserChangeName(userId, formValues.newName);
                                location.reload();
                            }}>
                                <Form>
                                    <button type="button" className={changeName ? "home__change--active" : "home__change"} onClick={() => {
                                        setChangeName(!changeName)
                                        setChangePass(false);
                                        setChangeAbout(false);
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
                                fetchUserChangePass(userId, formValues.newPassword);
                                location.reload();
                            }}>
                                <Form>
                                    <button type="button" className={changePass ? "home__change--active" : "home__change"} onClick={() => {
                                        setChangePass(!changePass);
                                        setChangeName(false);
                                        setChangeAbout(false);
                                    }}>Сменить пароль</button>
                                    {changePass &&
                                        <div className="home__list-hidden">
                                            <ChangePassFormikInput name='newPassword' className="home__list-input" type="password" placeholder="Новый пароль" />
                                            <button className="home__list-submit" type="submit">Изменить</button>
                                        </div>
                                    }
                                </Form>
                            </Formik>
                        </li>
                        <li className="home__list-item">
                            <Formik initialValues={initialAboutValues} validate={validateForm} onSubmit={(formValues: any) => {
                                fetchUserChangeAbout(userId, formValues.about);
                                location.reload();
                            }}>
                                <Form>
                                    <button type="button" className={changeAbout ? "home__change--active" : "home__change"} onClick={() => {
                                        setChangeAbout(!changeAbout);
                                        setChangePass(false);
                                        setChangeName(false);
                                    }}>Сменить описание</button>
                                    {changeAbout &&
                                        <div className="home__list-hidden">
                                            <ChangeAboutFormikInput name='about' className="home__list-input" type="text" placeholder="Ваше описание.." />
                                            <button className="home__list-submit" type="submit">Изменить</button>
                                        </div>
                                    }
                                </Form>
                            </Formik>
                        </li>
                    </ul>
                    <p className="home__change-warning">Осторожно! Следующая функция удалит ваш аккаунт навсегда!</p>
                    <div className="delete-btn__wrap">
                        <button className="delete-btn" type="button" onClick={() => setHandleDeleteAcc(true)}>Удалить аккаунт</button>
                    </div>
                </main>
            </div>
            <footer>
                <p className="home__help" onClick={() => navigate(PATH.support)}>Мне нужна помощь!</p>
                <p className="home__author">Автор проекта: @Abz_mijon</p>
            </footer>
        </StyledHome>
    )
};

export default Home;