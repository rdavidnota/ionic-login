import { USER_LOGIN, USER_LOGOUT } from "./actions";

const initialState = {
    credentials: {
        user: '',
        pass: ''
    }
};

export default function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                credentials: action.payload
            }
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
}