interface State {
    theme: string,
}

export const themeReducer = (state:State = {theme: 'dark'}, action) => {
    switch(action.type) {
        case 'setLightMode':
            return {
                ...state,
                theme: 'light',
            }
        case 'setDarkMode':
            return {
                ...state,
                theme: 'dark',
            }
        default:
            return {...state};
    }
};