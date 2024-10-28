import * as types from '../../constants/typeRedux';

const initialState = true;

const isLogin = (state = initialState, action) => {
    switch (action.type) {
        case types.IS_LOGIN:
            return action.bool;
        default:
            return state;
    }
}
export default isLogin;