interface State {
    isError: boolean,
    errorMessage: string,
}

export const serverErrorReducer = (state:State = {isError: false, errorMessage: ''}, action: { type: any; payload: { message: string; }; }) => {
    switch(action.type) {
        case 'throwError':
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message,
            }
        case 'noError':
            return {
                ...state,
                isError: false,
                errorMessage: '',
            }
        default:
            return {...state};
    }
};