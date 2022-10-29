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
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constans/routes';
import { IUser } from '../types';

const StyledUsers = styled.div `
    overflow: auto;
    padding: 40px 30px;
    background-color: ${(props) => props.theme.backgroundColor};
    .users__title {
        text-align: center;
        font-size: 45px;
        font-weight: bold;
        color: ${(props) => props.theme.fontColor};
        margin-bottom: 25px;
    }
    .header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 95px;
    }
    .users__sort {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .users__input-search {
        padding: 10px 20px;
        outline: none;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 5px;
    }
    .users__sort-title {
        margin-right: 15px;
        color: ${(props) => props.theme.fontColor};
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
        cursor: pointer;
        transition: 0.2s ease-in;
    }
    .users__user:hover, .users__user-top:hover {
        transform: scale(0.95);
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
    .users__search {
        position: relative;
    }
    .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 5px;
        font-size: 20px;
        font-weight: bold;
        color: #000;
    } 
`

function Users():JSX.Element {

    const [users, setUsers] = useState<IUser[]>([]);
    const [sortValue, setSortValue] = useState<string>('0');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const isError = useSelector(isServerError);
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers().then((response) => {
            setUsers(response.data);
        })
    }, []);

    useEffect(() => {
        setFilteredUsers(filterUsers([...users], sortValue, searchValue));
    }, [sortValue, users, searchValue]);

    const firstLvlUser:any = [...users].sort((prev:any, next:any) => next.level - prev.level).splice(0, 1);
    const secondLvlUser:any = [...users].sort((prev:any, next:any) => next.level - prev.level).splice(1, 1);
    const thirdLvlUser:any = [...users].sort((prev:any, next:any) => next.level - prev.level).splice(2, 1);

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
                    <div className="users__search">
                        <input 
                            type="text" 
                            className="users__input-search" 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder='По имени..'
                        />
                        <AiOutlineSearch className="search-icon"/>
                    </div>
                </header>
                <main className="main">
                    <ul className="users__list">
                        {filteredUsers.map((user) => {
                            return (
                                <li 
                                    key={user.id} 
                                    className={(user.id === firstLvlUser[0].id || user.id === secondLvlUser[0].id || user.id === thirdLvlUser[0].id) ? 
                                    'users__user-top' : 
                                    "users__user"} 
                                    style={{border: `12px solid ${userlvlColor(+user.level)}`, color: `${userlvlColor(+user.level)}`}}
                                    onClick={(e) => {
                                        navigate(PATH.userProfileId(user.id));
                                    }}
                                >
                                    {(user.id === firstLvlUser[0].id || user.id === secondLvlUser[0].id || user.id === thirdLvlUser[0].id) && 
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