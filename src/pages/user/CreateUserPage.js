import React, { useState } from 'react';
import { URL_API } from '../../constants/config';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Spinners from '../../components/Spinners';
import { useHistory } from 'react-router';

function CreateUserPage(props) {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoad, setIsLoad] = useState(false);

    const onSubmitForm = (data) => {
        setIsLoad(true);
        axios({
            method: "POST",
            url: `${URL_API}/auth/register`,
            data
        })
            .then(res => res.data)
            .then(data => {
                setIsLoad(false);
                if (data.messenger) {
                    toast.error(data.messenger, {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true
                    })
                }
                if (data.status === 'success') history.push('/users/list');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="tm-block-col tm-col-account-settings">
            <div className="tm-bg-primary-dark tm-block tm-block-settings">
                <h2 className="tm-block-title">Tạo tài khoản</h2>
                <form
                    className="tm-signup-form row"
                    onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="form-group col-lg-6">
                        <label htmlFor="firstName">Họ</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control validate"
                            {...register("firstName", {
                                required: "Vui lòng nhập trường này",
                                pattern: {
                                    value: /^[A-Za-z][A-Za-z\s]*$/,
                                    message: "Phải bắt đầu bằng chữ và không có kí tự đặc biệt"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Độ dài bé hơn 20 kí tự"
                                }
                            })}
                        />
                        {errors.firstName && <span style={{ color: "red" }}>{errors.firstName.message}</span>}
                    </div>
                    <div className="form-group col-lg-6">
                        <label htmlFor="lastName">Tên</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control validate"
                            {...register("lastName", {
                                required: "Vui lòng nhập trường này",
                                pattern: {
                                    value: /^[A-Za-z][A-Za-z\s]*$/,
                                    message: "Phải bắt đầu bằng chữ và không có kí tự đặc biệt"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Độ dài bé hơn 20 kí tự"
                                }
                            })}
                        />
                        {errors.lastName && <span style={{ color: "red" }}>{errors.lastName.message}</span>}
                    </div>
                    <div className="form-group col-lg-6">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control validate"
                            {...register("email", { 
                                required: "Vui lòng nhập trường này",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Email không đúng định dạng"
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Địa chỉ email không quá 30 kí tự"
                                }
                            })}
                        />
                        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
                    </div>
                    <div className="form-group col-lg-6">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control validate"
                            {...register("password", { 
                                required: "Vui lòng nhập trường này", 
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu phải chứa ít nhất 6 ký tự"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Mật khẩu không được vượt quá 12 ký tự"
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
                                    message: "Mật khẩu phải chứa chữ cái, số và ký tự đặc biệt"
                                }
                            })}
                        />
                        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
                    </div>
                    <div className="form-group col-lg-6">
                        <label htmlFor="role">Quyền</label>
                        <select
                            {...register("role", { required: true })}
                            className="custom-select" style={{ border: "1px solid black", outline: "none" }}>
                            <option value="user" >user</option>
                            <option value="admin" >admin</option>
                        </select>
                    </div>
                    <div className="form-group col-lg-6">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="form-control validate"
                            {...register("phone", { 
                                required: "Vui lòng nhập trường này",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Số điện thoại chỉ chứa số"
                                },
                                minLength: {
                                    value: 10,
                                    message: "Số điện thoại phải có ít nhất 10 số"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Số điện thoại không được vượt quá 10 số"
                                } })}
                        />
                        {errors.phone && <span style={{ color: "red" }}>{errors.phone.message}</span>}
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block text-uppercase"
                        >
                            {isLoad ? <Spinners /> : ''}
                            Tạo tài khoản
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUserPage;