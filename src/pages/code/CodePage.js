import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL_API } from '../../constants/config';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

function CodePage(props) {
    const [listCode, setListCode] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState('Thêm');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [code, setCode] = useState({});

    function fetchAllCode() {
        axios.get(`${URL_API}/code`)
            .then(res => res.data)
            .then(data => {
                setListCode(data.code);
            })
    }

    const handleToggleModal = (bool, label) => {
        setOpenModal(bool);
        setTitleModal(label);
        setCode({})
    }

    useEffect(() => {
        fetchAllCode();
    }, [])

    const handleEditCode = (id, label) => {
        axios.get(`${URL_API}/code/${id}`)
            .then(res => res.data)
            .then(data => {
                setCode(data.code);
                setOpenModal(true);
                setTitleModal(label);
            })
    }

    const handleSubmitEditCode = (data, id) => {
        setLoadingBtn(true);
        axios({
            url: `${URL_API}/code/${id}`,
            method: "POST",
            data: data,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
                setOpenModal(false);
                fetchAllCode();
                setLoadingBtn(false);
            })
    }

    const handleDeleteCode = (id) => {
        axios({
            url: `${URL_API}/code/${id}`,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
                toast.success("Xóa thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
                fetchAllCode();
            })
    }

    const handleAddCode = (data) => {
        axios({
            url: `${URL_API}/code`,
            method: "POST",
            data,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    fetchAllCode(); // Cập nhật danh sách mã giảm giá sau khi thêm
                    toast.success('Thêm mã giảm giá thành công!', {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true
                    })
                }
                else {
                    toast.error('Thêm mã giảm giá thất bại!', {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true
                    })
                }
            })
    }

    const confirmDelete = (codeId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này không?")) {
            handleDeleteCode(codeId);
        }
    };

    return (
        <div>
            {openModal === true ? <div className="modal-cu" onClick={() => handleToggleModal(false)}>
            </div> : ''}
            <div class="container-fluid">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Mã giảm giá</h6>
                    </div>
                </div>
                <div className="justify-content-between" style={{ display: 'flex' }}>
                    <button className="btn btn-success btn-cus" onClick={() => handleToggleModal(true, "Thêm")}>
                        <i class="fas fa-plus-circle"></i>
                        Thêm
                    </button>
                    <div className="result-product">
                        <span>Result :</span>
                        <select className="custom-se" >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>
            <Modal
                openModal={openModal}
                handleToggleModal={handleToggleModal}
                titleModal={titleModal}
                code={code}
                loadingBtn={loadingBtn}
                handleSubmitEditCode={handleSubmitEditCode}
                handleAddCode={handleAddCode}
            />
            <div className="card-body m-0 pt-0">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Code</th>
                                <th className="text-center">Giảm giá</th>
                                <th className="text-center">Ngày tạo</th>
                                <th className="text-center">Thời hạn</th>
                                <th className="text-center">Số lượng</th> {/* Thêm cột "Số lượng" */}
                                <th className="text-center">Sửa</th>
                                <th className="text-center">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCode.map((code, index) => {
                                const createdAt = new Date(code.createdAt);
                                const expirationDate = new Date(code.expirationDate);
                                const expirationDateString = isNaN(expirationDate.getTime()) ? 'Không hợp lệ' : expirationDate.toLocaleDateString();

                                return (
                                    <tr key={code._id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{code.code}</td>
                                        <td className="text-center">{`${code.discount} (${code.type})`}</td>
                                        <td className="text-center">{createdAt.toLocaleDateString()}</td>
                                        <td className="text-center">{expirationDateString}</td>
                                        <td className="text-center">{code.quantity}</td> {/* Hiển thị giá trị "Số lượng" */}
                                        <td className="text-center">
                                            <span className="icon-code" onClick={() => handleEditCode(code._id, 'Sửa')}>
                                                <i className="fas fa-edit"></i>
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="icon-code" onClick={() => confirmDelete(code._id)}>
                                                <i className="fas fa-trash"></i>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        </div>
    );
}

export default CodePage;