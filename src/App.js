import './css/sb-admin-2.css';
import React, { useEffect } from "react";
import Revenue from './components/Revenue/Revenue';
import Dashboard from './components/Dashboard/Dashboard';
import ListProductPage from './pages/product/ListProductPage';
import { PrivateRoute } from './helpers/PrivateRouter';
import { ToastContainer } from 'react-toastify';
import { URL_API } from './constants/config';
import NotFound from './components/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from './action/index';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Common from './pages/common/Common';
import axios from 'axios';
import EditProductPage from './pages/product/EditProductPage';
import CategoryProductPage from './pages/product/CategoryProductPage';
import ListUserPage from './pages/user/ListUserPage';
import CreateUserPage from './pages/user/CreateUserPage';
import OrdersPage from './pages/orders/OrdersPage';
import CodePage from './pages/code/CodePage';
import TypePage from './pages/product/TypePage';
import Profile from './pages/profile/profile';
import editProfile from './pages/profile/editProfile';
import { PostPage } from './pages/post/PostPage';
import { AddPostPage } from './pages/post/AddPostPage';
import { EditPostPage } from './pages/post/EditPostPage';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        async function getCurrentUser() {
            const token = sessionStorage.getItem('token') || null;
            if (token !== null) {
                axios({
                    method: "get",
                    url: `${URL_API}/auth/`,
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(res => res.data)
                    .then(data => {
                        dispatch(setUser(data.user));
                    })
            }
        }
        getCurrentUser();
    }, [dispatch]);

    return (
        <Router>
            <Switch>
                <Route path="/login" exact>
                    <AuthPage />
                </Route>
                {/* Redirect to Dashboard */}
                <Redirect from="/" to="/dashboard" exact/>
                <PrivateRoute path="/dashboard" exact component={Dashboard} layout={Common} />
                {/* Product */}
                <PrivateRoute path="/product/list" exact component={ListProductPage} layout={Common} />
                <PrivateRoute path="/product/edit/:productID" component={EditProductPage} layout={Common} />
                <PrivateRoute path="/product/category" component={CategoryProductPage} layout={Common} exact />
                <PrivateRoute path="/product/type" component={TypePage} layout={Common} />
                {/* Users */}
                <PrivateRoute path="/users/list" exact component={ListUserPage} layout={Common} />
                <PrivateRoute path="/users/add" exact component={CreateUserPage} layout={Common} />
                {/* Orders */}
                <PrivateRoute path="/orders" exact component={OrdersPage} layout={Common} />
                {/* Revenue */}
                <PrivateRoute path="/revenue" exact component={Revenue} layout={Common} />
                {/* Code */}
                <PrivateRoute path="/code" exact component={CodePage} layout={Common} />
                {/* Profile */}
                <PrivateRoute path="/profile" exact component={Profile} layout={Common} />
                <PrivateRoute path="/profile/edit" exact component={editProfile} layout={Common} />
                {/* Blog */}
                <PrivateRoute path="/blog" exact component={PostPage} layout={Common} />
                <PrivateRoute path="/blog/add" exact component={AddPostPage} layout={Common} />
                <PrivateRoute path="/blog/:id" exact component={EditPostPage} layout={Common} />
                <Route path="*" exact component={NotFound}></Route>
            </Switch>
            <ToastContainer />
        </Router>
    );
}

export default App;