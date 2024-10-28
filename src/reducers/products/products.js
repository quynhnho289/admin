import * as types from '../../constants/typeRedux';
import _ from 'lodash';


const initialState = [];

const products = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_PRODUCT:
            return action.products;
        case types.ADD_PRODUCT:
            state.push(action.product);
            return [...state];
        case types.DELETE_PRODUCT:
            var index = _.findIndex(state, (e) => {
                return e._id === action.id;
            });
            if (index !== -1) {
                state.splice(index, 1);
            }
            return [...state];
        default:
            return [...state];
    }
}




export default products;