import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { fetchUsers } from "../api/users";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import defaultAvatar from '../assets/img/defaultAvatar.jpg';
import HomeHeader from "../Components/Home/HomeHeader";

const StyledUserProfileViewing = styled.div `
    
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
    console.log(user);
    
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
            <div className="home">
                <HomeHeader 
                    userLvl={user.level} 
                    userName={user.name} 
                    aboutText={user.about}/>
            </div>
            </div>
        </StyledUserProfileViewing>
    )
}

export default UserProfileViewing;