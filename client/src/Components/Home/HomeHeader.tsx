import React, { useState } from "react";
import styled from 'styled-components';
import defaultAvatar from '../../assets/img/defaultAvatar.jpg';
import { userlvlColor } from "../../helpers/userlvlColor";
import { BsFillPencilFill } from "react-icons/bs";
import ThemeSwitcher from "../ThemeSwither";

const StyledHomeHeader = styled.div `
    .header {
        margin-bottom: 35px;
        position: relative;
    }
    .header__wrap {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 20px;
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
        margin-right: 20px;
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
        color: #fff;
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
    .home__name {
        margin-bottom: 8px;
    }
`

function HomeHeader({ userLvl, userName, aboutText }):JSX.Element {

    const [changeTitle, setChangeTitle] = useState(false);

    return (
        <StyledHomeHeader>
            <header className="header">
                <div className="header__wrap">
                    <div className="home__photo"
                        onMouseLeave={() => setChangeTitle(false)} 
                        onMouseOver={() => setChangeTitle(true)} 
                        style={{border: `3px solid ${userlvlColor(userLvl)}`, boxShadow: `0 0 40px ${userlvlColor(userLvl)}`}}>
                        <img src={defaultAvatar} alt="" className="home__icon" />
                        <BsFillPencilFill className="home__icon-pen"/>
                        {changeTitle && <h5 className="home__change-title">Сменить аватарку</h5>}
                    </div>
                    <div className="home__main-info">
                        <p className="home__name"><span className="titles">Имя:</span> {userName}</p>
                        <p className="home__lvl"><span className="titles">Уровень профиля:</span> {userLvl}</p>
                    </div>
                </div>
                <h4 className="home__about-title titles">Информация о себе:</h4>
                <p className="home__about">{aboutText}</p>
                <ThemeSwitcher/>
            </header>
        </StyledHomeHeader>
    )
}

export default HomeHeader;