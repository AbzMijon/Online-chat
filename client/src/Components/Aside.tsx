import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { BiSupport, BiLogOut } from 'react-icons/bi';
import { useSelector, useDispatch } from "react-redux";
import defautAvatar from '../assets/img/defaultAvatar.jpg';
import { useNavigate } from "react-router-dom";
import { PATH, ROUTES } from "../constans/routes";
import { fetchUsers } from "../api/users";
import { userlvlColor } from "../helpers/userlvlColor";
import { userEmail } from "../store/selectors/userSelectors";
import { ThreeDots } from "react-loader-spinner";
import { array } from "prop-types";

const StyledAside = styled.div `
    .aside {
        position: relative;
        padding: 60px 50px;
        background-color: #0d1117;
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
        color: #c7c7c7;
    }
    .aside__name-arrow {
        font-size: 18px;
        font-weight: bold;
        color: #c7c7c7;
    }
    .aside__hidden-block {
        display: none;
    }
    .aside__hidden-block--handle {
        text-align: center;
        position: absolute;
        padding: 5px 10px;
        border-radius: 5px;
        border-bottom: 1px solid #c7c7c7;
        border-right: 1px solid #c7c7c7;
        border-left: 1px solid #c7c7c7;
        bottom: -25%;
        left: 50%;
        transform: translate(-50%);
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;
        color: #c7c7c7;
    } 
    .aside__hidden-item:hover {
        color: #fff;
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
        border-bottom: 1px solid transparent;
    }
    .aside__menu-item:hover {
        border-bottom: 1px solid #fff;
        color: #fff;
    }
    .aside__icon {
        font-size: 17px;
        margin-right: 15px;
    }
    .aside__menu-item--active {
        cursor: pointer;
        transition: 0.2s ease-in;
        padding: 15px 5px;
        display: flex;
        align-items: center;
        font-size: 15px;
        letter-spacing: 2px;
        font-weight: bold;
        border-bottom: 1px solid #fff;
        color: #fff;
    }
    .aside__logout {
        position: absolute;
        bottom: 40px;
        left: 55px;
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
    .aside__img {
        position: relative;
    }
    .aside__lvl {
        position: absolute;
        bottom: 10px;
        left: 5px;
        border-radius: 50%;
        border: 1px solid #851e1e;
        text-align: center;
        width: 35px;
        height: 35px;
        font-size: 20px;
        font-weight: bold;
        color: #000000;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

function Aside():JSX.Element {

    const userMail = useSelector(userEmail);
    const [userName, setUserName] = useState('');
    const [handleName, setHandleName] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [lvlColor, setLvlColor] = useState(0);
    const logout = () => {
        dispatch({type: 'userLogOut'});
    }
    
    const location = window.location.pathname;   
    
    useEffect(() => {
        fetchUsers().then(response => {
            const findUser = response.data.find(user => {
                return user.email === userMail;
            })
            setLvlColor(findUser.level);
            setUserName(findUser.name);
        })
    }, []);

    return (
        <StyledAside>
            <aside className="aside">

                <header className="aside__header">
                    <div className="aside__img">
                        <img src={defautAvatar} alt="avatar" className="aside__avatar" style={{border: `4px solid ${userlvlColor(lvlColor)}`}}/>
                        <div className="aside__lvl" style={{border: `2px solid ${userlvlColor(lvlColor)}`, color: `${userlvlColor(lvlColor)}`}}>{lvlColor}</div>
                    </div>
                    <div className="aside__name-wrapper" onClick={() => setHandleName(!handleName)}>
                        <h5 className="aside__name">{!userName.length ?             
                            <ThreeDots
                                height="10" 
                                width="20" 
                                radius="9"
                                color="#fff" 
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                visible={true}
                            /> 
                        :
                        userName}</h5>
                        <MdKeyboardArrowDown className="aside__name-arrow"/>
                    </div>
                    <div className={handleName ? "aside__hidden-block--handle" : "aside__hidden-block"}>
                        <ul className="aside__hidden-list">
                            <li className="aside__hidden-item" onClick={() => navigate(ROUTES.support)}>support</li>
                            <li className="aside__hidden-item" onClick={logout}>log out</li>
                        </ul>
                    </div>
                </header>

                <nav className="nav">
                    <ul className="aside__menu">
                        <li className={location === PATH.homePage
                            ? 'aside__menu-item--active' 
                            : 'aside__menu-item'} 
                            onClick={() => navigate(PATH.homePage)}>
                            <AiOutlineHome className='aside__icon aside__home-icon'/>HOME</li>
                        <li className={location === PATH.chat 
                            ? 'aside__menu-item--active' 
                            : 'aside__menu-item'} 
                            onClick={() => navigate(PATH.chat)}>
                            <BsFillChatDotsFill className='aside__icon aside__chat-icon'/>CHAT</li>
                        <li className={location === PATH.users 
                            ? 'aside__menu-item--active' 
                            : 'aside__menu-item'} 
                            onClick={() => navigate(PATH.users)}>
                            <FaUsers className='aside__icon aside__notif-icon'/>USERS</li>
                        <li className={location === PATH.achives 
                            ? 'aside__menu-item--active' 
                            : 'aside__menu-item'} 
                            onClick={() => navigate(PATH.achives)}>
                            <FiSettings className='aside__icon aside__settings-icon'/>ACHIVES</li>
                        <li className={location === PATH.support 
                            ? 'aside__menu-item--active' 
                            : 'aside__menu-item'} 
                            onClick={() => navigate(PATH.support)}>
                            <BiSupport className='aside__icon aside__support-icon'/>SUPPORT</li>
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