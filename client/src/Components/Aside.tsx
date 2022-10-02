import React, { useState } from "react";
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { BiSupport, BiLogOut } from 'react-icons/bi';
import { loggedUserName } from "../store/selectors/userSelectors";
import { useSelector, useDispatch } from "react-redux";
import defautAvatar from '../assets/img/defaultAvatar.jpg';
import { useNavigate } from "react-router-dom";
import { PATH } from "../constans/routes";

const StyledAside = styled.div`
    .aside {
        position: relative;
        padding: 60px 40px;
        background-color: #fff;
        border-right: 1px solid #c7c7c7;
        height: 100%;
    }
    .aside__header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 95px;
        position: relative;
    }
    .aside__avatar {
        border: 1px solid #5c5c5c;
        border-radius: 50%;
        width: 170px;
        height: 170px;
        margin-bottom: 15px;
    }
    .aside__name-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .aside__name {
        margin-right: 7px;
        font-size: 15px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    .aside__name-arrow {
        font-size: 18px;
        font-weight: bold;
    }
    .aside__hidden-block {
        display: none;
    }
    .aside__hidden-block--handle {
        text-align: center;
        position: absolute;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #c7c7c7;
        bottom: -36%;
        left: 50%;
        transform: translate(-50%);
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;
    } 
    .aside__hidden-item:hover {
        color: #04C45C;
    }
    .aside__menu-item {
        color: #5c5c5c;
        cursor: pointer;
        transition: 0.2s ease-in;
        padding: 15px 5px;
        display: flex;
        align-items: center;
        font-size: 15px;
        letter-spacing: 2px;
        font-weight: bold;
        border: 1px solid transparent;
    }
    .aside__menu-item:hover {
        border-bottom: 1px solid #04C45C;
        color: #04C45C;
    }
    .aside__icon {
        font-size: 17px;
        margin-right: 15px;
    }
    .aside__logout {
        position: absolute;
        bottom: 40px;
        left: 40px;
        display: flex;
        align-items:center;
        color: #5c5c5c;
        cursor: pointer;
        border-bottom: 1px solid transparent;
    }
    .aside__logout:hover {
        border-bottom: 1px solid #851e1e;
        color: #851e1e;
    }
`

function Aside():JSX.Element {

    const userName = useSelector(loggedUserName);
    const [handleName, setHandleName] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({type: 'userLogOut'});
    }

    return (
        <StyledAside>
            <aside className="aside">

                <header className="aside__header">
                    <img src={defautAvatar} alt="avatar" className="aside__avatar"/>
                    <div className="aside__name-wrapper" onClick={() => setHandleName(!handleName)}>
                        <h5 className="aside__name">{userName}</h5>
                        <MdKeyboardArrowDown className="aside__name-arrow"/>
                    </div>
                    <div className={handleName ? "aside__hidden-block--handle" : "aside__hidden-block"}>
                        <ul className="aside__hidden-list">
                            <li className="aside__hidden-item">go to profile</li>
                            <li className="aside__hidden-item">support</li>
                            <li className="aside__hidden-item" onClick={logout}>log out</li>
                        </ul>
                    </div>
                </header>

                <nav className="nav">
                    <ul className="aside__menu">
                        <li className="aside__menu-item" onClick={() => navigate(PATH.homePage)}><AiOutlineHome className='aside__icon aside__home-icon'/>HOME</li>
                        <li className="aside__menu-item" onClick={() => navigate(PATH.chat)}><BsFillChatDotsFill className='aside__icon aside__chat-icon'/>CHAT</li>
                        <li className="aside__menu-item" onClick={() => navigate(PATH.notification)}><IoIosNotificationsOutline className='aside__icon aside__notif-icon'/>NOTIFICATIONS</li>
                        <li className="aside__menu-item" onClick={() => navigate(PATH.settings)}><FiSettings className='aside__icon aside__settings-icon'/>SETTINGS</li>
                        <li className="aside__menu-item" onClick={() => navigate(PATH.support)}><BiSupport className='aside__icon aside__support-icon'/>SUPPORT</li>
                    </ul>
                </nav>
                <div className="aside__logout-wrapper" onClick={logout}>
                    <div className="aside__logout"><BiLogOut className='aside__icon aside__logout-icon'/>LOG OUT</div>
                </div>
            </aside>
        </StyledAside>
    )
}

export default Aside;