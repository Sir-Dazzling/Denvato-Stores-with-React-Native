import {LOGIN, SIGNUP} from '../actions/Auth';

const initialState = 
{
    token: null,
    userId: null
};

const authenticationReducer = (state = initialState, action) => 
{
    switch (action.type)
    {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            };
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            };
        default:
            return state;
    }
};
export default authenticationReducer;