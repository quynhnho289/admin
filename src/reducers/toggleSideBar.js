import * as types from '../constants/typeRedux';

const initialState = true;

const toggleNavbar = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_NAVBAR:
            return !state;
        default:
            return state;
    }
}
export default toggleNavbar