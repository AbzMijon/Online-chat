import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { PATH } from '../constans/routes';
import styled from 'styled-components';
import { isServerError } from "../store/selectors/serverErrorSelectors";
import { useSelector } from "react-redux";
import GlobalServerError from "../HOC/GlobalServerError";
import { loggedUserId } from "../store/selectors/userSelectors";
import { fetchUsers } from "../api/users";
import Spinner from '../Components/Spinner';
import DeleteAccTry from "../Components/DeleteAccTry";
import HomeHeader from "../Components/Home/HomeHeader";
import ChangeName from '../Components/Home/ChangeName';
import ChangePass from '../Components/Home/ChangePass';
import ChangeAbout from '../Components/Home/ChangeAbout';

const StyledHome = styled.div `
    overflow: auto;
    padding: 60px;
    margin: 0;
    background-color: ${(props: { theme: { backgroundColor: any; }; }) => props.theme.backgroundColor};
    position: relative;
    .home {
        padding: 20px 80px;
        height: 100%;
        color: ${(props: { theme: { fontColor: any; }; }) => props.theme.fontColor};
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
    .home__list {
        width: 100%;
    }
    .home__list-item {
        width: 100%;
        padding: 10px 0px;
    }
    .home__change, .home__change--active {
        padding: 8px 15px;
        border: none;
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        border-radius: 5px;
        background-color: ${(props: { theme: { elemsBackground: any; }; }) => props.theme.elemsBackground};
        cursor: pointer;
        transition: 0.3s ease-out;
        margin-bottom: 10px;
        color: ${(props) => props.theme.changeFontColor};
    }
    .home__change:hover {
        transform: scaleY(1.1);
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
        margin-bottom: 5px;
        border-radius: 3px;
        background-color: ${(props) => props.theme.elemsBackground};
        color: ${(props) => props.theme.changeFontColor};
    }
    .home__list-submit {
        cursor: pointer;
        background-color: ${(props) => props.theme.elemsBackground};
        color: ${(props) => props.theme.changeFontColor};
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
    const [aboutText, setAboutText] = useState('');
    const [userLvl, setUserLvl] = useState(null);
    const [handleDeleteAcc, setHandleDeleteAcc] = useState(false);

    type userTypes = {
        email: string,
        password: string,
        name: string,
        id: number | string,
        level: number | string,
        messageAmount: number | string,
        about: string,
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
    if(!aboutText.length || userLvl === null) {
        return <Spinner/>
    }

    return (
        <StyledHome>
            {handleDeleteAcc && 
                <DeleteAccTry setHandleDeleteAcc={setHandleDeleteAcc} userId={userId}/>
            }
            <div className="home">
                <HomeHeader 
                    userLvl={userLvl} 
                    userName={userName} 
                    aboutText={aboutText}/>
                <main className="main">
                    <ul className="home__list">
                        <ChangeName 
                            changeName={changeName} 
                            setChangeName={setChangeName} 
                            setChangePass={setChangePass} 
                            setChangeAbout={setChangeAbout}/>
                        <ChangePass 
                            changePass={changePass} 
                            setChangeName={setChangeName} 
                            setChangePass={setChangePass} 
                            setChangeAbout={setChangeAbout}/>
                        <ChangeAbout 
                            changeAbout={changeAbout}
                            setChangeName={setChangeName} 
                            setChangePass={setChangePass} 
                            setChangeAbout={setChangeAbout}/>
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