interface State {
    isLoggedIn: boolean,
    name: string,
    password: string,
    id: number | string,
    color: string,
}
export const userReducer = (state:State = 
    {
        isLoggedIn: false, 
        name: '', 
        password: '', 
        id: '',
        color: '',
    }, 
        action: 
            { 
                type: any; 
                payload: 
                    { 
                        name: string; 
                        password: string; 
                        id: number | string; 
                        color: string,
                    } 
            }) => {
    switch(action.type) {
        case 'userLogIn':
            return {
                ...state,
                isLoggedIn: true,
                name: action.payload.name,
                password: action.payload.password,
                id: action.payload.id,
                color: action.payload.color,
            };
            case 'userLogOut':
                return {
                ...state,
                isLoggedIn: false,
                name: '',
                password: '',
                id: '',
                color: '',
            };
            default:
                return {...state};
            }
        }