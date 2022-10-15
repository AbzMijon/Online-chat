interface State {
    isLoggedIn: boolean,
    name: string,
    password: string,
    color: string,
    email: string,
}
export const userReducer = (state:State = 
    {
        isLoggedIn: false, 
        name: '', 
        password: '', 
        color: '',
        email: '',
    }, 
        action: 
            { 
                type: any; 
                payload: 
                    { 
                        name: string; 
                        password: string; 
                        color: string,
                        email: string,
                    } 
            }) => {
    switch(action.type) {
        case 'userLogIn':
            return {
                ...state,
                isLoggedIn: true,
                name: action.payload.name,
                password: action.payload.password,
                color: action.payload.color,
                email: action.payload.email,
            };
            case 'userLogOut':
                return {
                ...state,
                isLoggedIn: false,
                name: '',
                password: '',
                color: '',
                email: '',
            };
            default:
                return {...state};
            }
        }