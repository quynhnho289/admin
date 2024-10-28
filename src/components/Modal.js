import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Spinners from './Spinners';

function Modal(props) {
    const {
        openModal,
        handleToggleModal,
        titleModal,
        code,
        handleSubmitEditCode,
        loadingBtn,
        handleAddCode
    } = props;

    const [type, setType] = useState('%');
    const { register, handleSubmit, setValue, setError, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (code.type) {
            setType(code.type);
        }
        if (code.expirationDate) {
            setValue('expirationDate', new Date(code.expirationDate).toISOString().split('T')[0]);
        }
        if (code.quantity) {
            setValue('quantity', code.quantity);
        }
    }, [code, setValue]);

    function isNaN(x) {
        x = Number(x);
        return x !== x;
    }

    const handleCloseModal = (bool) => {
        handleToggleModal(bool);
    }

    const onSubmitForm = (data) => {
        const formData = {
            ...data,
            expirationDate: new Date(data.expirationDate).toISOString()
        };

        const creationDate = code.creationDate ? new Date(code.creationDate) : new Date();
        const expirationDate = new Date(data.expirationDate);

        if (expirationDate <= creationDate) {
            setError('expirationDate', {
                type: 'manual',
                message: 'Thời hạn không được nhỏ hơn hoặc bằng ngày tạo',
            });
            return;
        }

        if (type === '%' && (data.discount > 100 || data.discount < 1)) {
            setError('discount', {
                type: 'manual',
                message: 'Discount phải nằm trong khoảng từ 1% đến 100%',
            });
            return;
        }

        if (type === 'đ' && data.discount < 1) {
            setError('discount', {
                type: 'manual',
                message: 'Discount phải lớn hơn hoặc bằng 1đ',
            });
            return;
        }

        if (titleModal === 'Sửa') {
            if (formData.code === "" && isNaN(formData.discount)) {
                handleSubmitEditCode({
                    code: code.code,
                    discount: code.discount,
                    type: type,
                    expirationDate: formData.expirationDate,
                    quantity: formData.quantity // Update quantity with form data
                }, code._id, true);
            } else if (formData.code === "") {
                formData.code = code.code;
                formData.type = type;
                handleSubmitEditCode(formData, code._id, true);
            } else if (isNaN(formData.discount)) {
                formData.type = type;
                formData.discount = code.discount;
                handleSubmitEditCode(formData, code._id, true);
            } else {
                handleSubmitEditCode(formData, code._id, true);
            }
        } else {
            if (formData.code === "" || isNaN(formData.discount)) {
                toast.error("Vui lòng nhập đầy đủ thông tin!", {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                });
            } else {
                formData.type = type;
                handleAddCode(formData);
                reset(); // Reset form inputs after adding a new code
            }
        }
    }

    const onChangeType = (e) => {
        setType(e.target.value);
    }

    return (
        <div className={`modal ${openModal ? 'show' : ''} fade`} id="exampleModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{titleModal} mã giảm giá</h5>
                        <button type="button" className="close" onClick={() => handleCloseModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="form-group">
                                <label className="col-form-label">Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={code.code}
                                    {...register('code', { required: false, minLength: 6 })}
                                />
                                {errors.code && <span style={{ color: 'red' }}>Tối thiểu 6 kí tự</span>}
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Discount</label>
                                <input
                                    type="text"
                                    {...register('discount', { required: false, valueAsNumber: true })}
                                    defaultValue={code.discount}
                                    className="form-control"
                                />
                                {errors.discount && <span style={{ color: 'red' }}>{errors.discount.message}</span>}
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Thời hạn</label>
                                <input
                                    type="date"
                                    {...register('expirationDate', { required: true })}
                                    className="form-control"
                                />
                                {errors.expirationDate && <span style={{ color: 'red' }}>{errors.expirationDate.message}</span>}
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Loại</label>
                                <select
                                    className="custom-select"
                                    defaultValue={code.type}
                                    onChange={onChangeType}
                                >
                                    <option selected={code.type === "%"} value="%">%</option>
                                    <option selected={code.type === "đ"} value="đ">đ</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Số lượng</label>
                                <input
                                    type="number"
                                    {...register('quantity', { required: true, min: 1 })}
                                    defaultValue={code.quantity}
                                    className="form-control"
                                />
                                {errors.quantity && <span style={{ color: 'red' }}>{errors.quantity.message}</span>}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    {loadingBtn ? <Spinners /> : ""}
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

export default Modal;