import React from "react";
import styled from 'styled-components';
import Aside from "../Components/Aside";
import { Outlet } from "react-router-dom";

const StyledMainLayout = styled.div `
    .home {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 300px 1fr;
    }
`

function MainLayout():JSX.Element {
        return (
            <StyledMainLayout>
                <div className="home">
                    <Aside/>
                    <Outlet/>
                </div>
            </StyledMainLayout>
        )
}

export default MainLayout;