import React from "react";
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';

const StyledAside = styled.div`
    
`

function Aside():JSX.Element {
    return (
        <StyledAside>
            <aside className="aside">
                <div className="aside__profile">
                    <img src="#" alt="avatar" className="aside__avatar"/>
                    <div className="aside__name-wrapper">
                        <h5 className="aside__name"></h5>
                        <MdKeyboardArrowDown className="aside__name-arrow"/>
                    </div>
                    <div className="aside__hidden-block">
                        <ul className="aside__hidden-list">
                            <li className="aside__hidden-item">go to profile</li>
                            <li className="aside__hidden-item">support</li>
                            <li className="aside__hidden-item">log out</li>
                        </ul>
                    </div>
                </div>
                <nav className="nav">
                    <ul className="aside__menu">
                        <li className="aside__menu-item"><AiOutlineHome className='aside__icon aside__home-icon'/>HOME</li>
                        <li className="aside__menu-item"><BsFillChatDotsFill className='aside__icon aside__chat-icon'/>CHAT</li>
                        <li className="aside__menu-item"><IoIosNotificationsOutline className='aside__icon aside__notif-icon'/>NOTIFICATIONS</li>
                        <li className="aside__menu-item"><FiSettings className='aside__icon aside__settings-icon'/>SETTINGS</li>
                        <li className="aside__menu-item"><BiSupport className='aside__icon aside__support-icon'/>SUPPORT</li>
                    </ul>
                </nav>
                <div className="aside__logout-wrapper">
                    <div className="aside__logout">LOG OUT</div>
                </div>
            </aside>
        </StyledAside>
    )
}

export default Aside;