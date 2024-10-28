import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../../constants/config';
import { deleteOneUser, GetAllUser } from '../../action/index';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalUser from '../../components/ModalUser';

function ListUserPage(props) {
    const dispatch = useDispatch();
    const [totalPage, setTotalPage] = useState(null);
    const users = useSelector((state) => state.user) || [];
    const [keyword, setKeyWord] = useState("");
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [page, setPage] = useState({
        page: 1,
        limit: 5
    });
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState('Sửa');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [user, setUser] = useState({});

    const onchangeInputSearch = (e) => {
        setKeyWord(e.target.value);
    }

    const onSubmitKeyWordSearch = (e) => {
        setIsLoadingPage(true);
        e.preventDefault();
        axios({
            method: "POST",
            url: `${URL_API}/user/search`,
            data: {
                keyword
            }
        })
            .then(res => res.data)
            .then(data => {
                setIsLoadingPage(false);
                dispatch(GetAllUser(data.user))
            })
            .catch(err => {
                console.log(err);
            })
    }

    const role = ['admin', 'user'];

    const onChangeSelect = (e) => {
        let value = e.target.value;
        handleChangeLimit(value);
    }

    function fetchAllUsers() {
        setIsLoadingPage(true);
        const config = {
            method: "GET",
            url: `${URL_API}/user?limit=${page.limit}&page=${page.page}`
        }
        axios(config)
            .then(res => res.data)
            .then(data => {
                console.log(data)
                setIsLoadingPage(false);
                setTotalPage(data.totalPage);
                dispatch(GetAllUser(data.users));
            })
    }

    useEffect(() => {
        fetchAllUsers();
        return () => {
            dispatch(GetAllUser([]));
        };
    }, [page])

    const handleDeleteUser = (id) => {
        const token = sessionStorage.getItem('token');
        axios({
            method: "DELETE",
            url: `${URL_API}/user/${id}`,
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.data)
            .then(data => {
                dispatch(deleteOneUser(id));
                toast.success('Xóa tài khoản thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            })
            .catch(err => {
                toast.warning('Xóa tài khoản thất bại!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            })
    }

    const handleEditUser = (id) => {
        axios.get(`${URL_API}/user/${id}`)
            .then(res => res.data)
            .then(data => {
                setUser(data.user);
                setOpenModal(true);
                setTitleModal('Sửa');
            })
    }

    const handleSubmitEditUser = (data, id) => {
        setLoadingBtn(true);
        axios({
            url: `${URL_API}/user/${id}`,
            method: "PUT", // Sử dụng phương thức PUT để cập nhật người dùng
            data: data,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
                setOpenModal(false);
                fetchAllUsers();
                setLoadingBtn(false);
                toast.success('Cập nhật người dùng thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                });
            })
            .catch(err => {
                setLoadingBtn(false);
                toast.error('Cập nhật người dùng thất bại!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                });
            });
    }

    const handleChangePage = (indexPage) => {
        setPage({ ...page, page: indexPage.selected + 1 })
    }

    const handleChangeLimit = (limit) => {
        setPage({ ...page, limit })
    }

    const onChangeRole = (e, id) => {
        axios({
            method: "POST",
            url: `${URL_API}/user/role`,
            data: {
                role: e.target.value,
                userID: id
            },
            headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        })
            .then(res => res.data)
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div className="wrapper-product">
            <div class="container-fluid">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
                    </div>
                </div>
                <div className="justify-content-between" style={{ display: 'flex', marginBottom: "10px" }}>
                    <form className="wrapper-search" onSubmit={onSubmitKeyWordSearch}>
                        <input
                            type="text"
                            onChange={onchangeInputSearch}
                            placeholder="Tìm kiếm theo email...."
                        />
                    </form>
                    <div className="result-product">
                        <span>Result :</span>
                        <select className="custom-se" name="result" onChange={onChangeSelect}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>
            <ModalUser
                openModal={openModal}
                handleToggleModal={setOpenModal}
                titleModal={titleModal}
                user={user}
                loadingBtn={loadingBtn}
                handleSubmitEditUser={handleSubmitEditUser}
                
            />
            <div class="card-body m-0 pt-0">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Họ Tên</th>
                                <th className="text-center">Quyền</th>
                                <th className="text-center">Số Điện Thoại</th>
                                <th className="text-center">Ngày tạo</th>
                                <th className="text-center">Hành động</th>
                            </tr>
                        </thead>
                        {isLoadingPage ? '' : users.map((user, index) => {
                            return (
                                <tbody key={user._id}>
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{user.email}</td>
                                        <td className="text-center">{`${user.firstName} ${user.lastName}`}</td>
                                        <td className="text-center">
                                            <select
                                                onChange={(e) => onChangeRole(e, user._id)}
                                                className="select-cus"
                                                
                                            >
                                                {role.map((r, index) => {
                                                    return <option key={index} selected={user.role === r}>{r}</option>;
                                                })}
                                            </select>
                                        </td>
                                        <td className="text-center">{user.phone}</td>
                                        <td className="text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleEditUser(user._id)}
                                                className="btn btn-primary"><i class="fas fa-pen-square"></i></button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="btn btn-warning"><i class="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
                {isLoadingPage ? <Loading /> : ''}
            </div>
            <ReactPaginate
                containerClassName='container-pagination'
                pageClassName='page-pagination'
                pageCount={totalPage}
                pageRangeDisplayed={1}
                initialPage={0}
                nextLabel={<i class="fas fa-chevron-circle-right"></i>}
                previousLabel={<i class="fas fa-chevron-circle-left"></i>}
                previousClassName='control-pagination'
                nextClassName='control-pagination'
                onPageChange={handleChangePage}
                activeClassName='active-pagination'
            />
        </div>
    );
}

export default ListUserPage;