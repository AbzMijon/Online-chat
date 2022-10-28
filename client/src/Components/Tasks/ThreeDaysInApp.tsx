import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const StyledThreeDaysInApp = styled.div `
    
`

function ThreeDaysInApp():JSX.Element {

    return (
        <StyledThreeDaysInApp>
            <div className="three-days">
                <span className="three-days__text">Вам осталось: </span>
            </div>
        </StyledThreeDaysInApp>
    )
}

export default ThreeDaysInApp;