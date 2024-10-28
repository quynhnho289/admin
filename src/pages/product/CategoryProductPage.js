import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { URL_API } from '../../constants/config';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Loading from '../../components/Loading';
import { getAllProduct } from '../../action/index';
import TableCategoryItem from '../../components/product/TableCategoryItem';
function CategoryProductPage(props) {
    const dispatch = useDispatch();
    const [totalPage, setTotalPage] = useState(null);
    const [keywordText, setKeywordText] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [page, setPage] = useState({
        page: 1,
        litmit: 5
    })
    const onChangeInput = (e) => {
        setKeywordText(e.target.value);
    }
    const onChangeSelect = (e) => {
        setIsLoadingPage(true);
        let value = e.target.value;
        searchByKeyword(value);
    }
    const handleChangePage = (indexPage) => {
        setPage({ ...page, page: indexPage.selected + 1 })
    }
    useEffect(() => {
        setIsLoadingPage(true);
        const config = {
            method: "GET",
            url: `${URL_API}/products?limit=${page.limit}&page=${page.page}`
        }
        axios(config)
            .then(res => res.data)
            .then(data => {
                setTotalPage(data.totalPage);
                setProducts(data.products)
                dispatch(getAllProduct(data.products))
                setIsLoadingPage(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [page])
    const onSubmitSearchKeyword = (e) => {
        setIsLoadingPage(true);
        e.preventDefault();
        searchByKeyword(keywordText);
    }
    const searchByKeyword = (value) => {
        axios({
            method: "GET",
            url: `${URL_API}/products/search?keyword=${value}`,
        })
            .then(res => res.data)
            .then(data => {
                setIsLoadingPage(false);
                setProducts(data.products);
            })
    }
    const changeCategoryProduct = (value) => {
        axios({
            method: "POST",
            url: `${URL_API}/products/category`,
            data: value,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <div class="container-fluid">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Gian hàng</h6>
                    </div>
                </div>
                <div className="justify-content-between" style={{ display: 'flex', marginBottom: "10px" }}>
                    <form className="wrapper-search" onSubmit={onSubmitSearchKeyword}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên...."
                            onChange={onChangeInput}
                        />
                    </form>
                    <div className="result-product">
                        <select className="custom-se" onChange={onChangeSelect}>
                            <option value="">Tất cả</option>
                            <option value="Sale">Sale</option>
                            <option value="News">News</option>
                            <option value="Popular">Popular</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body m-0 pt-0">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên sách</th>
                                <th className="text-center">Hình ảnh</th>
                                <th className="text-center">Sale</th>
                                <th className="text-center">News</th>
                                <th className="text-center">Popular</th>
                            </tr>
                        </thead>
                        {isLoadingPage ? '' : products.map((product, index) => {
                            return <TableCategoryItem
                                changeCategoryProduct={changeCategoryProduct}
                                index={index + 1}
                                product={product}
                                key={product._id}
                            />
                        })}
                    </table>
                </div>

                {isLoadingPage ? <Loading /> : ''}
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
        </div>
    );
}

export default CategoryProductPage;