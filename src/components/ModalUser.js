import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Spinners from './Spinners';

function ModalUser(props) {
    const {
        openModal,
        handleToggleModal,
        titleModal,
        user,
        handleSubmitEditUser,
        loadingBtn,
        handleAddUser
    } = props;

    const { register, handleSubmit, setValue, setError, reset, watch, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
            setValue('phone', user.phone);
            setValue('address', user.address);
        }
    }, [user, setValue]);

    const onSubmitForm = (data) => {
        if (titleModal === 'Sửa') {
            handleSubmitEditUser(data, user._id);
        } else {
            handleAddUser(data);
        }
    };

    return (
        <div className={`modal ${openModal ? 'show' : ''} fade`} id="exampleModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{titleModal} người dùng</h5>
                        <button type="button" className="close" onClick={() => handleToggleModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="form-group">
                                <label className="col-form-label">Họ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('firstName', { required: 'Vui lòng nhập trường này' })}
                                />
                                {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('lastName', { required: 'Vui lòng nhập trường này' })}
                                />
                                {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">SĐT</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('phone', {
                                        required: 'Vui lòng nhập trường này',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Số điện thoại chỉ chứa số'
                                        },
                                        minLength: {
                                            value: 10,
                                            message: 'Số điện thoại phải có ít nhất 10 số'
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Số điện thoại không được vượt quá 10 số'
                                        }
                                    })}
                                />
                                {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Nhập mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    {...register('password', {
                                        minLength: {
                                            value: 6,
                                            message: 'Mật khẩu phải chứa ít nhất 6 ký tự'
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: 'Mật khẩu không được vượt quá 12 ký tự'
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                            message: 'Mật khẩu phải chứa chữ cái, số và ký tự đặc biệt'
                                        }
                                    })}
                                    placeholder="Bỏ trống nếu không đổi..."
                                />
                                {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Nhập lại mật khẩu</label>
                                <input
                                    type="password"
                                    placeholder="Bỏ trống nếu không đổi..."
                                    className="form-control"
                                    {...register('confirmPassword', {
                                        validate: value =>
                                            value === watch('password') || 'Mật khẩu nhập lại không khớp'
                                    })}
                                />
                                {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    {loadingBtn ? <Spinners /> : ''}
                                    {titleModal}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalUser;