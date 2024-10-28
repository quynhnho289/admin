import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinners from '../Spinners';
function Login(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordShow, setPasswordShow] = useState(false);
    const { handleLogin, isLoadingBtn } = props;
    const checkRef = useRef();
    const onSubMitForm = (data) => {
        handleLogin(data);
    }
    const showPassword = () => {
        if (checkRef.current.checked) {
            setPasswordShow(true)
        }
        else {
            setPasswordShow(false)
        }
    }
    return (

        <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div className="col-lg-6">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit(onSubMitForm)}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-user"
                                            id="exampleInputEmail"
                                            aria-describedby="emailHelp"
                                            placeholder="Nhập tài khoản..."
                                            {...register('email', { pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, required: true })} />
                                        {errors.email && <span style={{ color: 'red' }}>Trường này phải là email</span>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type={passwordShow ? 'text' : 'password'}
                                            className="form-control form-control-user"
                                            id="exampleInputPassword"
                                            placeholder="Nhập mật khẩu..."
                                            {...register('password', { required: true })} />
                                        {errors.password && <span style={{ color: 'red' }}>Vui lòng nhập mật khẩu</span>}
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox small">
                                            <input type="checkbox"
                                                ref={checkRef}
                                                onChange={showPassword}
                                                className="custom-control-input"
                                                id="customCheck" />
                                            <label className="custom-control-label" for="customCheck">Hiện mật khẩu</label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-user btn-block">
                                        {isLoadingBtn ? <Spinners /> : ''}
                                        Login
                                        </button>
                                </form>
                                <hr />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;