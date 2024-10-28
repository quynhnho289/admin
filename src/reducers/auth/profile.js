import * as types from '../../constants/typeRedux';
var initialState = {};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return { ...action.user };
        default: return state
    }
}

export default profile;