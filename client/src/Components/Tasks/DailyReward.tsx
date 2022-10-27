import React, { useState } from "react";
import styled from 'styled-components';

const StyledDailyReward = styled.div `
    .daily-reward__title {
        font-size: 15px;
    }
`

function DailyReward():JSX.Element {

    return (
        <StyledDailyReward>
            <div className="daily-reward">
                <h4 className="daily-reward__title">До следующей награды осталось: {`00:00:00`}</h4>
            </div>
        </StyledDailyReward>
    )
}

export default DailyReward;