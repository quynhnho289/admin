import * as types from '../constants/typeRedux';

const initialState = false;

const toggleModal = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_MODAL:
            return action.bool;
        default:
            return state;
    }
}
export default toggleModal