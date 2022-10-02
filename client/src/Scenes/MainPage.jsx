import React from "react";
import styled from 'styled-components';
import Aside from "../Components/Aside";
import Chat from "./Chat";

const StyledMainPage = styled.div `
    .home {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 350px 1fr;
    }
`

function MainPage() {
    return (
        <StyledMainPage>
            <div className="home">
                <Aside/>
                <Chat/>
            </div>
        </StyledMainPage>
    )
}

export default MainPage;