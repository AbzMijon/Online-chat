interface State {
    isLoggedIn: boolean,
    name: string,
    password: string,
    id: number | string,
}
export const userReducer = (state:State = 
    {
        isLoggedIn: false, 
        name: '', 
        password: '', 
        id: ''}, 
        action: 
            { 
                type: any; 
                payload: 
                    { 
                        name: string; 
                        password: string; 
                        id: number | string; 
                    } 
            }) => {
    switch(action.type) {
        case 'userLogIn':
            return {
                ...state,
                isLoggedIn: true,
                name: action.payload.name,
                password: action.payload.password,
                id: action.payload.id
            };
            case 'userLogOut':
                return {
                ...state,
                isLoggedIn: false,
                name: '',
                password: '',
                id: '',
            };
            default:
                return {...state};
            }
        }