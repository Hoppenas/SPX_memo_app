import { SET_EMAIL } from "../actions/userInfo";

const initialState = {
    email: "test@test.com",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return {...state, email: action.payload}
        default: return state;
    }
}

export default authReducer;
