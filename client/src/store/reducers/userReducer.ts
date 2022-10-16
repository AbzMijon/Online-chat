interface State {
    isLoggedIn: boolean,
    name: string,
    id: number | string,
    color: string,
    email: string,
}
export const userReducer = (state:State = 
    {
        isLoggedIn: false, 
        name: '', 
        id: 0, 
        color: '',
        email: '',
    }, 
        action: 
            { 
                type: any; 
                payload: 
                    { 
                        name: string; 
                        id: string | number,
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
                id: action.payload.id,
                color: action.payload.color,
                email: action.payload.email,
            };
            case 'userLogOut':
                return {
                ...state,
                isLoggedIn: false,
                name: '',
                id: 0,
                color: '',
                email: '',
            };
            default:
                return {...state};
            }
        }