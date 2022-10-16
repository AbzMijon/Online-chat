import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import UserSort from "../Components/UsersSort";
import { fetchUsers } from "../api/users";
import defautAvatar from '../assets/img/defaultAvatar.jpg';
import { userlvlColor } from "../helpers/userlvlColor";
import Spinner from '../Components/Spinner';
import { GiQueenCrown } from 'react-icons/gi';
import { filterUsers } from "../helpers/filterUsers";
import { isServerError } from "../store/selectors/serverErrorSelectors";
import { useSelector } from "react-redux";
import GlobalServerError from "../HOC/GlobalServerError";

const StyledUsers = styled.div `
    overflow: auto;
    padding: 40px 30px;
    background-color: #1c0707;
    .users__title {
        text-align: center;
        font-size: 45px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 25px;
    }
    .users__sort {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 105px;
    }
    .users__sort-title {
        margin-right: 15px;
        color: #fff;
    }
    .users__list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto;
        gap: 30px;
        justify-items: center;
    }
    .users__user, .users__user-top {
        position: relative;
        width: 200px;
        height: 250px;
        padding: 8px 25px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }
    .users__name {
        text-align: center;
        font-weight: bold;
        font-size: 17px;
        letter-spacing: 0.5px;
    }
    .users__lvl {
        font-weight: bold;
        font-size: 17px;
    }
    .users__img {
        border-radius: 10px;
    }
    .users__crone {
        font-size: 75px;
        color: #ffd400;
        position: absolute;
        top: -74px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
    }
    .users__user-top {
        border-radius: 0;
        box-shadow: 0 0 50px #ffd400;
    }
`

function Users():JSX.Element {

    const [users, setUsers] = useState([]);
    const [sortValue, setSortValue] = useState('0');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const isError = useSelector(isServerError);

    type User = {
        email: string,
        id: number | string,
        level: number | string,
        name: string,
        password: string,
    }

    useEffect(() => {
        fetchUsers().then((response) => {
            setUsers(response.data);
        })
    }, []);

    const bestLevelUsers = filterUsers([...users], sortValue).splice(0, 3);
    for (let i = 0; i <= bestLevelUsers.length; i++) {
        
    }    
    useEffect(() => {
        setFilteredUsers(filterUsers([...users], sortValue));
    }, [sortValue, users]);

    if(isError) {
        return <GlobalServerError/>
    }
    if(!users.length) {
        return <Spinner/>
    }

    return (
        <StyledUsers>
            <h2 className="users__title">Users</h2>
            <div className="users">
                <header className="header">
                    <div className="users__sort">
                        <h4 className="users__sort-title">Сортировать по:</h4>
                        <UserSort setSortValue={setSortValue}/>
                    </div>
                </header>
                <main className="main">
                    <ul className="users__list">
                        {filteredUsers.map((user:User, i) => {                            
                            return (
                                <li key={user.id} className={i <= 2 && sortValue === '0' ? 'users__user-top' : "users__user"} style={{border: `12px solid ${userlvlColor(+user.level)}`, color: `${userlvlColor(+user.level)}`}}>
                                    {i <= 2 && sortValue === '0' && 
                                        <GiQueenCrown className="users__crone"/>
                                    }
                                    <h5 className="users__name">{user.name}</h5>
                                    <img className="users__img" src={defautAvatar} alt="" />
                                    <span className="users__lvl">{user.level}</span>
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </div>
        </StyledUsers>
    )
};

export default Users;