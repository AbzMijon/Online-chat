import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import UserSort from "../Components/UsersSort";
import { fetchUsers } from "../api/users";
import defautAvatar from '../assets/img/defaultAvatar.jpg';
import { userlvlColor } from "../helpers/userlvlColor";
import Spinner from '../Components/Spinner';

const StyledUsers = styled.div `
    overflow: auto;
    padding: 40px 30px;
    .users__title {
        text-align: center;
        font-size: 45px;
        font-weight: bold;
        color: #000;
        margin-bottom: 25px;
    }
    .users__sort {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 45px;
    }
    .users__sort-title {
        margin-right: 15px;
    }
    .users__list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto;
        gap: 30px;
        justify-items: center;
    }
    .users__user {
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
`

function Users():JSX.Element {

    const [users, setUsers] = useState([]);
    const [sortValue, setSortValue] = useState('0');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then((response) => {
            setUsers(response.data);
        })
    }, []);

    const filterUsers = (usersToFilter, sortingValue) => {

        switch(sortingValue) {
            case '0':
                return usersToFilter.sort((prev, next) => next.level - prev.level);
            case '1':
                return usersToFilter.sort((prev, next) => {
                    if ( prev.name < next.name ) return -1;
                    if ( prev.name < next.name ) return 1;
                });
            case '2':
                return usersToFilter.sort((prev, next) => next.id - prev.id)
            default:
                return usersToFilter.sort((prev, next) => next.level - prev.level);
        }
    }
    
    useEffect(() => {
        setFilteredUsers(filterUsers([...users], sortValue));
    }, [sortValue, users]);

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
                        {filteredUsers.map((user:object) => {
                            return (
                                <li key={user.id} className="users__user" style={{border: `12px solid ${userlvlColor(+user.level)}`, color: `${userlvlColor(+user.level)}`}}>
                                    {console.log(user.level)}
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