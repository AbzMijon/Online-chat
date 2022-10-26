import React, { useState, useEffect } from 'react';
import { AiFillCrown } from 'react-icons/ai';
import  { BsSearch } from 'react-icons/bs';
import { ThreeDots } from "react-loader-spinner";
import { ROUTES } from '../constans/routes';
import { fetchUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledChatHeader = styled.div `
    .chat__name {
        font-size: 19px;
        text-align: center;
        color: ${(props) => props.theme.fontColor};
    }
    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: ${(props) => props.theme.backgroundColor};
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-bottom: 1px solid #c4c4c4;
        padding: 7px 0;
        z-index: 3;
    }
    .chat__users {
        color: ${(props) => props.theme.fontColor};
        display: flex;
        cursor: pointer;
    }
    .chat__search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chat__search-icon {
        font-size: 25px;
        color: ${(props) => props.theme.fontColor};
        cursor: pointer;
    }
    .chat__search-input {
        border: none;
        outline: none;
        background-color: ${(props) => props.theme.chatInput};
        font-size: 22px;
        color: ${(props) => props.theme.fontColor};
        padding: 10px 15px;
        border-radius: 5px;
        margin-right: 15px;
    }
    .chat__maxlvl {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 50px;
        color: ${(props) => props.theme.fontColor};
        font-size: 17px;
        display: flex;
        align-items: center;
    }
    .crown {
        color: #b1b112;
        margin-right: 5px;
    }
`

function ChatHeader({ searchValue, setSearchValue }):JSX.Element {
    const [users, setUsers] = useState(0);
    const [theBestLvlUsers, setTheBestLvlUsers] = useState(null);
    const [amountUsers, setAmountUsers] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUsers().then(response => {
            setAmountUsers(response.data.length);
            const onlyBestUsers = response.data.filter(bestUser => {
                return +bestUser.level >= 1000;
            })
            setTheBestLvlUsers(onlyBestUsers.length);
        })
    }, [users]);

    return (
        <StyledChatHeader>
            <header className="header">
                <h4 className="chat__maxlvl"><AiFillCrown className="crown"/> 1000 lvl+: {theBestLvlUsers === null ?
                    <ThreeDots
                        height="20" 
                        width="20" 
                        radius="9"
                        color="#fff" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                        />
                            : theBestLvlUsers
                        }</h4>
                <h2 className="chat__name">Единственный Всемирный чат</h2>
                <h5 className="chat__users" onClick={() => navigate(ROUTES.users)}>Участников: {amountUsers === null ?
                    <ThreeDots
                        height="20" 
                        width="20" 
                        radius="9"
                        color="#fff" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                        />
                        : amountUsers}
                        </h5>
                <div className="chat__search">
                    <input type="text" className="chat__search-input" placeholder="Поиск.." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <BsSearch className="chat__search-icon"/>
                </div>
            </header>
        </StyledChatHeader>
    )
}

export default ChatHeader;