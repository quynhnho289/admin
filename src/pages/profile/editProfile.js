import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { URL_API } from '../../constants/config';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { setUser } from '../../action/index';
import axios from 'axios';
import Loading from '../../components/Loading';
import Spinners from '../../components/Spinners';
import { useForm } from 'react-hook-form';

function EditProfile(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [file, setFile] = useState({});
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [password, setPassword] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        role: "",
        image: ""
    })
    const { formState: { errors } } = useForm();

    const onChangePassword = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }
    const inputFile = useRef();
    const getProfile = () => {
        setIsLoading(true);
        axios.get(`${URL_API}/user/${sessionStorage.getItem('userID')}`)
            .then(res => res.data)
            .then(data => {
                if (data.status === 'success') {
                    setData({
                        firstName: data.user.firstName,
                        lastName: data.user.lastName,
                        phone: data.user.phone,
                        address: data.user.address || '',
                        role: data.user.role
                    })
                    setProfile(data.user)
                    setImage(data.user.image);
                    setUser(data.user)
                }
                setIsLoadingBtn(false)
            })
    }
    useEffect(() => {
        getProfile();
    }, [])

    const handleOnchangeForm = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const phonePattern = /^[0-9]*$/;
            if (!phonePattern.test(value)) {
                return; // Không cập nhật state nếu giá trị không hợp lệ
            }
        }

        setData({
            ...data,
            [name]: value
        });
    }
    const handleSubmitForm = () => {
        if (isChangePassword) {
            if (password.password === password.confirmPassword) data.password = password.password;
            else {
                toast.error('Mật khẩu nhập lại không trùng khớp', {
                    position: 'top-right',
                    autoClose: 3000,
                    closeButton: true
                })
                return;
            }
        }

        // Kiểm tra số điện thoại
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(data.phone)) {
            toast.error('Số điện thoại không hợp lệ', {
                position: 'top-right',
                autoClose: 3000,
                closeButton: true
            });
            return;
        }

        setIsLoadingBtn(true);
        const dataUser = new FormData();
        dataUser.append('user', JSON.stringify(data))
        dataUser.append('userImage', file)
        axios({
            url: `${URL_API}/user`,
            method: "POST",
            data: dataUser,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === 'success') {
                    dispatch(setUser(data.user))
                    history.push('/profile')
                }
                else {
                    toast.error('Lỗi', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                }
                setIsLoadingBtn(false);
            })
    }
    const onChangeFileImage = (e) => {
        setFile(e.target.files[0])
        encodeImageFileAsURL(e.target.files[0]);
    }
    const handleClickFile = () => {
        inputFile.current.click();
    }
    const encodeImageFileAsURL = (element) => {
        var file = element;
        var reader = new FileReader();
        reader.onloadend = function () {
            setImage(reader.result)
        }
        reader.readAsDataURL(file);
    }
    return (
        <div className="container">
            <div className="main-body">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Edit Profile</h6>
                    </div>
                </div>
                {isLoading ? <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={image} alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                    <div className="mt-3">
                                        <h4>{`${profile.firstName} ${profile.lastName}`}</h4>
                                        <p className="text-secondary mb-1">{profile.role}</p>
                                        <input
                                            type="file"
                                            name="image"
                                            ref={inputFile}
                                            onChange={onChangeFileImage}
                                            hidden />
                                        <button
                                            onClick={handleClickFile}
                                            className="btn btn-outline-primary"
                                        >Thay đổi avatar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Frist Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" name="firstName" onChange={handleOnchangeForm} value={data.firstName} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Last Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" name="lastName" onChange={handleOnchangeForm} value={data.lastName} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">SĐT</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={handleOnchangeForm}
                                            value={data.phone}
                                            name="phone"
                                        />
                                        {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Địa chỉ</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" className="form-control" name="address" onChange={handleOnchangeForm} value={data.address} />
                                    </div>
                                </div>
                                {isChangePassword ? <div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mật khẩu mới</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="password" className="form-control" name="password" onChange={onChangePassword} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Nhập lại mật khẩu mới</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <input type="password" className="form-control" name='confirmPassword' onChange={onChangePassword} />
                                        </div>
                                    </div>
                                </div> : ""}
                                <div className="row">
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-9 text-secondary">
                                        <Link
                                            className="btn btn-success px-4"
                                            to="/profile"
                                        >Quay Lại</Link>
                                        <button
                                            onClick={() => setIsChangePassword(!isChangePassword)}
                                            type="button"
                                            className="btn btn-primary px-4">
                                            Đổi mật khẩu
                                        </button>
                                        <button
                                            onClick={handleSubmitForm}
                                            type="button"
                                            className="btn btn-primary px-4">
                                            {isLoadingBtn ? <Spinners /> : ''} Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    : <Loading />}
            </div>
        </div>
    );
}

export default EditProfile;