import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { URL_API } from '../../constants/config';
function TypePage(props) {
    const [types, setTypes] = useState([]);
    const [typeInput, setTypeInput] = useState('')
    const [nxb, setNxb] = useState([]);
    const [nxbInput, setNxbInput] = useState('');
    const fetchAllType = () => {
        axios.get(`${URL_API}/tn/type`)
            .then(res => res.data)
            .then(data => {
                setTypes(data.types);
            })
    }
    const fetchAllNxb = () => {
        axios.get(`${URL_API}/tn/nxb`)
            .then(res => res.data)
            .then(data => {
                setNxb(data.nxb);
            })
    }
    useEffect(() => {
        fetchAllType();
        fetchAllNxb();
    }, [])
    const onChangeInputType = (e) => {
        setTypeInput(e.target.value);
    }
    const onChangeInputNxb = (e) => {
        setNxbInput(e.target.value);
    }
    const handleSubmitType = (e) => {
        e.preventDefault();
        axios({
            url: `${URL_API}/tn/type`,
            method: "POST",
            data: { name: typeInput },
            headers: {
                "Authorization": `${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    toast.success('Thêm thành công!', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                    setTypeInput('');
                    fetchAllType();
                }
                else {
                    toast.error('Thêm thất bại!', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                }
            })
    }
    const handleSubmitNxb = (e) => {
        e.preventDefault();
        axios({
            url: `${URL_API}/tn/nxb`,
            method: "POST",
            data: { name: nxbInput },
            headers: {
                "Authorization": `${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    toast.success('Thêm thành công!', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                    setNxbInput('');
                    fetchAllNxb();
                }
                else {
                    toast.error('Thêm thất bại!', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                }
            })
    }
    const handleDeleteType = (id) => {
        console.log(id)
        axios({
            url: `${URL_API}/tn/type/${id}`,
            method: "DELETE",
            headers: {
                "Authorization": `${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === 'success') {
                    fetchAllType();
                    toast.success('Xóa thành công!', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                }
                else {
                    toast.error(data.messenger, {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                }
            })
    }
    const handleDeleteNxb = (id) => {
        axios({
            url: `${URL_API}/tn/nxb/${id}`,
            method: "DELETE",
            headers: {
                "Authorization": `${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === 'success') {
                    fetchAllNxb();
                    toast.success('Xóa thành công!', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                }
                else {
                    toast.error(data.messenger, {
                        position: 'top-right',
                        autoClose: 3000,
                        closeButton: true
                    })
                }
            })
    }
    return (
        <div className="container-fluid">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Thể loại/Nhà xuất bản</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <div className="wrapper-types">
                        <form
                            onSubmit={handleSubmitType}
                            className="form-type">
                            <input
                                className="input-type"
                                type="text"
                                placeholder="Thể loại..."
                                value={typeInput}
                                onChange={onChangeInputType}
                            />
                            <button type="submit" className="btn-primary btn">Thêm</button>
                        </form>
                        <ul class="list-type">
                            {types.map(type => {
                                return (
                                    <li
                                        key={type._id}
                                        className="list-type-item">
                                        <span>{type.name}</span>
                                        <span className="type-icon" onClick={() => handleDeleteType(type._id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </span>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="wrapper-types">
                        <form className="form-type" onSubmit={handleSubmitNxb} >
                            <input
                                className="input-type"
                                type="text"
                                placeholder="Nhà xuất bản..."
                                onChange={onChangeInputNxb}
                                value={nxbInput}
                            />
                            <button type="submit" className="btn-primary btn">Thêm</button>
                        </form>
                        <ul class="list-type">
                            {nxb.map(n => {
                                return (
                                    <li
                                        key={n._id}
                                        className="list-type-item">
                                        <span>{n.name}</span>
                                        <span
                                            onClick={() => handleDeleteNxb(n._id)}
                                            className="type-icon">
                                            <i className="fas fa-trash-alt"></i>
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TypePage;