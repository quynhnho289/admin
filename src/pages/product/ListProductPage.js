import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, getAllProduct, onToggleModal } from '../../action/index';
import { URL_API } from '../../constants/config';
import ReactPaginate from 'react-paginate';
import AddProduct from '../../components/product/AddProduct';
import axios from 'axios';
import { toast } from 'react-toastify';
function ProductPage(props) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [totalPage, setTotalPage] = useState(null);
    const [updateProduct, setUpdateProduct] = useState(null);
    const [rsForm, setRsForm] = useState(false);
    const isToggle = useSelector((state) => state.toggleModal);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [types, setTypes] = useState([{ _id: "" }]);
    const [nxb, setNxb] = useState([{ _id: "" }])
    const [page, setPage] = useState({
        page: 1,
        limit: 5
    });
    const handleShowModal = () => {
        dispatch(onToggleModal(true))
    }
    const handleCloseModal = () => {
        dispatch(onToggleModal(false))
    }
    const onChangeSelect = (e) => {
        let value = e.target.value;
        handleChangeLimit(value);
    }
    function fetchAllTypeAndNxb() {
        axios.get(`${URL_API}/tn/type`)
            .then(res => res.data)
            .then(data => {
                setTypes(data.types);
            })
        axios.get(`${URL_API}/tn/nxb`)
            .then(res => res.data)
            .then(data => {
                setNxb(data.nxb);
            })
    }
    function fetchProduct() {
        setIsLoadingPage(true);
        const config = {
            method: "GET",
            url: `${URL_API}/products?limit=${page.limit}&page=${page.page}`
        }
        axios(config)
            .then(res => res.data)
            .then(data => {
                setIsLoadingPage(false);
                setTotalPage(data.totalPage);
                console.log(data.products)
                dispatch(getAllProduct(Object.values(data.products)))
            })
    }
    const handleRsForm = (bool) => {
        setRsForm(bool);
    }
    useEffect(() => {
        fetchAllTypeAndNxb();
        let unsubcribe = fetchProduct();
        return unsubcribe;
    }, [page, updateProduct])
    const handleAddProduct = (data, files) => {
        setLoadingBtn(true);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('image', file);
        })
        formData.append("product", JSON.stringify(data));
        const token = sessionStorage.getItem('token');
        axios({
            url: `${URL_API}/products`,
            method: "POST",
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .catch(err => {
                console.log(err);
            })
            .then(res => res.data)
            .then(data => {
                setLoadingBtn(false);
                dispatch(addProduct(data.product));
                console.log(data)
                toast.success('Thêm sản phẩm thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
                handleRsForm(true);
                setUpdateProduct(data.product._id);
                dispatch(onToggleModal(false));
            });
    }
    const handleDeleteProduct = (id) => {
        const token = sessionStorage.getItem('token');
        axios({
            method: "DELETE",
            url: `${URL_API}/products/${id}`,
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.data)
            .then(data => {
                dispatch(deleteProduct(id));
                toast.success('Xóa sản phẩm thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            })
            .catch(err => {
                toast.warning('Xóa sản phẩm thất bại!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            })
    }
    const handleChangePage = (indexPage) => {
        setPage({ ...page, page: indexPage.selected + 1 })
    }
    const handleChangeLimit = (limit) => {
        setPage({ ...page, limit })
    }
    const confirmDelete = (productId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            handleDeleteProduct(productId);
        }
    };
    return (
        <div className="wrapper-product">
            {isToggle === true ? <div className="modal-cu" onClick={handleCloseModal}>
            </div> : ''}
            <div class="container-fluid">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                    </div>
                </div>
                <div className="justify-content-between" style={{ display: 'flex' }}>
                    <button className="btn btn-success btn-cus" onClick={handleShowModal}>
                        <i class="fas fa-plus-circle"></i>
                        Thêm
                    </button>
                    <div className="result-product">
                        <span>Result :</span>
                        <select className="custom-se" onChange={onChangeSelect}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body m-0 pt-0">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="text-center">Tên sách</th>
                                <th className="text-center">Tên tác giả</th>
                                <th className="text-center">Hình ảnh</th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-center">Giá</th>
                                <th className="text-center">Thể loại</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        {isLoadingPage ? '' : products.map(product => {
                            console.log(product.urls, product.title, 123456);
                            return (
                                <tbody key={product._id}>
                                    <tr>
                                        <td className="text-center">{product.title}</td>
                                        <td className="text-center">{product.author}</td>
                                        <td className="text-center">
                                            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                                {product.urls.map(img => {
                                                    return <img key={img.id} src={img.url} alt={product.title} style={{ width: "40px", height: "50px", objectFit: "contain" }}></img>
                                                })}
                                            </div>
                                        </td>
                                        <td className="text-center">{product.inStock}</td>
                                        <td className="text-center">{`${product.price}(VND)`}</td>
                                        <td className="text-center">{product.types ? product.types.name : 'N/A'}</td>
                                        <td className="text-center">
                                            <Link to={`edit/${product._id}`} className="btn btn-primary"><i class="fas fa-pen-square"></i></Link>
                                            <button
                                                onClick={() => confirmDelete(product._id)}
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
            <div className={isToggle === true ? "show-custom" : "hide"}>
                <AddProduct
                    rsForm={rsForm}
                    handleCloseModal={handleCloseModal}
                    handleAddProduct={handleAddProduct}
                    handleRsForm={handleRsForm}
                    loadingBtn={loadingBtn}
                    types={types}
                    nxb={nxb}
                ></AddProduct>
            </div>
        </div>
    );
}

export default ProductPage;