import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { fetchUsers } from "../api/users";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import defaultAvatar from '../assets/img/defaultAvatar.jpg';
import { userlvlColor } from "../helpers/userlvlColor";
import { AiFillHeart } from 'react-icons/ai';

const StyledUserProfileViewing = styled.div `
    background-color: ${(props: { theme: { backgroundColor: any; }; }) => props.theme.backgroundColor};
    .profile {
        padding: 25px 75px;
        color: #fff;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .profile__main {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .profile__avatar {
        border-radius: 50%;
        width: 300px;
        height: 300px;
        margin: 30px auto;
    }
    .profile__name, .profile__lvl, .profile__about, .profile__likes, .profile__date-registry {
        font-size: 18px;
    }
    .profile__name, .profile__lvl, .profile__likes {
        border: 1px solid #fff;
        width: 100%;
        height: 100%;
        padding: 5px;
    }
    .profile__mini-title {
        color: #7a7a7a;
    }
    .profile__about-title {
        margin-bottom: 17px;
    }
    .profile__about {
        margin: 45px 0;
        text-align: center;
    }
    .profile__handle-like {
        position: relative;
        font-size: 18px;
        cursor: pointer;
        border: 2px solid #cf4780;
        background-color: transparent;
        color: #fff;
        outline: none;
        transition: 0.1s ease-out;
        box-shadow: inset 0px 0px 30px #cf4780;
    }
    .profile__handle-like:hover {
        background-color: #cf4780;
    }
    .like-icon {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-45%);
        color: #fff;
        font-size: 25px;
    }
    .profile__date-registry {
        text-align: center;
        margin-bottom: 30px;
    }
`

function UserProfileViewing():JSX.Element {

    type User = {
        email: string,
        password: string,
        name: string,
        id: number | string,
        level: number | string,
        messageAmount: number | string,
        about: string,
        registryDate: any,
    }

    const [user, setUser] = useState(null);
    const {userId} = useParams();
    
    useEffect(() => {
        fetchUsers().then((response) => {
            const findUser = response.data.find((dataUsers:User) => {
                return +dataUsers.id === +userId;
            })  
            setUser(findUser);
        })
    }, []);

    if(user === null) {
        return <Spinner/>
    } 

    return (
        <StyledUserProfileViewing>
            <div className="profile">
                <img src={defaultAvatar} alt="" className="profile__avatar" style={{border: `4px solid ${userlvlColor(user.level)}`, boxShadow: `0 0 40px ${userlvlColor(user.level)}`}} />
                <h5 className="profile__date-registry"><span className="profile__mini-title">Дата регистрации: </span>{user.registryDate}</h5>
                <div className="profile__main">
                    <h4 className="profile__name"><span className="profile__mini-title">Имя: </span>{user.name}</h4>
                    <h4 className="profile__lvl"><span className="profile__mini-title">Уровень: </span>{user.level}</h4>
                    <h4 className="profile__likes"><span className="profile__mini-title">Всего благодарнастей: </span>0</h4>
                    <button type="button" className="profile__handle-like">Поблагодарить <span className="like-icon"><AiFillHeart/></span></button>
                </div>
                <div className="profile__about">
                    <h3 className="profile__about-title profile__mini-title">Информация о себе:</h3>
                    <p>{user.about}</p>
                </div>
            </div>
        </StyledUserProfileViewing>
    )
}

export default UserProfileViewing;