import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../../components/auth/Login';
import axios from 'axios';
import { URL_API } from '../../constants/config';
import { useDispatch } from 'react-redux';
import { setUser } from '../../action/index';
import { toast } from 'react-toastify';
function AuthPage(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const handleLogin = (value) => {
        setIsLoadingBtn(true)
        axios({
            url: `${URL_API}/auth/admin/login`,
            method: "POST",
            data: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data)
            .then(data => {
                setIsLoadingBtn(false)
                if (data.status === 'success') {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('userID', data.user.id);
                    dispatch(setUser(data.user));
                    history.push('/product/list');
                }
                if (data.status === 'failed') {
                    toast.error(data.messenger, {
                        autoClose: 3000,
                        closeButton: true,
                        position: 'top-right'
                    })
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="bg-gradient-primary" style={{ width: '100%', height: '100vh' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <Login
                        isLoadingBtn={isLoadingBtn}
                        handleLogin={handleLogin} />
                </div>
            </div>
        </div>
    );
}

export default AuthPage;