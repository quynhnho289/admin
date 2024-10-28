import { combineReducers } from 'redux';
import products from './products/products';
import toggleModal from './toggleModal';
import profile from './auth/profile';
import user from './user/user';
import toggleNavbar from './toggleSideBar';
const appReducers = combineReducers({
    products,
    toggleModal,
    profile,
    user,
    toggleNavbar
})

export default appReducers;