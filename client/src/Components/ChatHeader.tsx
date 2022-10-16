import React, { useState, useEffect } from 'react';
import { AiFillCrown } from 'react-icons/ai';
import  { BsSearch } from 'react-icons/bs';
import { ThreeDots } from "react-loader-spinner";
import { ROUTES } from '../constans/routes';
import { fetchUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';

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
    )
}

export default ChatHeader;