import React from "react";
import styled from 'styled-components';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { themeMode } from "../store/selectors/themeSelectors";
import { useDispatch } from "react-redux";

const StyledThemeSwitcher = styled.div `
    .switcher__wrap {
        position: absolute;
        top: 15px;
        right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .moon-icon, .sun-icon {
        font-size: 18px;
        color: ${(props) => props.theme.fontColor};
        margin: 7px;
    }
    .switcher {
        border-radius: 10px;
        background-color: ${(props) => props.theme.fontColor};
        position: relative;
        width: 60px;
        height: 30px;
        cursor: pointer;
        padding: 3px;
    }
    .switch__circle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        height: 25px;
        background-color: ${(props) => props.theme.changeFontColor};
        border-radius: 50%;
        width: 25px;
        transition: 0.3s ease-out;
    }
    .switch__circle--dark {
        left: 3px;
    }
    .switch__circle--light {
        right: 3px;
    }
`

function ThemeSwitcher():JSX.Element {

    const theme = useSelector(themeMode);
    const dispatch = useDispatch();
    const toggleTheme = () => {
        if(theme === 'dark') {
            return dispatch({type: 'setLightMode'});
        }
        else {
            return dispatch({type: 'setDarkMode'});
        }
    }

    return (
        <StyledThemeSwitcher>
            <div className="switcher__wrap">
                <BsFillMoonStarsFill className="moon-icon"/>
                <div className="switcher" onClick={toggleTheme}>
                    <div className={theme === 'dark' ? 'switch__circle switch__circle--dark' : 'switch__circle switch__circle--light'}></div>
                </div>
                <BsFillSunFill className="sun-icon"/>
            </div>
        </StyledThemeSwitcher>
    )
}

export default ThemeSwitcher;