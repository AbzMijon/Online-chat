import React from "react";
import { ThemeProvider } from 'styled-components';
import { darkMode, lightMode } from '../constans/themes';
import { useSelector } from "react-redux";
import { themeMode } from '../store/selectors/themeSelectors';

function GlobalThemeProvider(props) {
    
    const theme = useSelector(themeMode);
    
    return (
        <ThemeProvider theme={theme === 'dark' ? darkMode : lightMode}>
            {props.children}
        </ThemeProvider>
    )
}

export default GlobalThemeProvider;