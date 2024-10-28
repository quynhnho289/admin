import * as types from '../../constants/typeRedux';
import _ from 'lodash';
var initialState = [];

const user = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_USERS:
            return [...action.users];
        case types.DELETE_ONE_USER:
            var index = _.findIndex(state, e => e._id === action.id, 0);
            if (index !== -1) {
                state.splice(index, 1);
                return [...state];
            } else {
                return [...state];
            }
        default: return state
    }
}

export default user;