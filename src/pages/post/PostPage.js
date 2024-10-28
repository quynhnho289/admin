import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../css/custom.css';
import { URL_API } from '../../constants/config';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
export const PostPage = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({
        page: 1,
        litmit: 5
    })
    const onChangeSearch = (e) => {
        setKeyword(e.target.value);
    }
    const fetchAllPost = () => {
        setLoading(false);
        axios({
            method: "GET",
            url: `${URL_API}/post?limit=${page.litmit}&page=${page.page}`
        })
            .then(res => res.data)
            .then(data => {
                console.log(data)
                setLoading(true);
                setPosts(data.Posts);
                setTotalPage(data.totalPage);
            })
    }
    useEffect(() => {
        fetchAllPost();
        return () => {
            setPosts([]);
        }
    }, [page])
    const handleSubmitSearchText = (e) => {
        setLoading(false);
        e.preventDefault();

        axios({
            method: "POST",
            url: `${URL_API}/post/search`,
            data: { keyword }
        })
            .then(res => res.data)
            .then(data => {
                setLoading(true);
                setPosts(data.posts);
            });
    }
    const handleDeletePost = (id) => {
        axios({
            method: "DELETE",
            url: `${URL_API}/post/${id}`,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    fetchAllPost();
                    toast.success("Xóa sản phẩm thành công", {
                        autoClose: 3000,
                        closeButton: true,
                        position: "top-right"
                    })

                }
            })
    }
    const onChangeLitmit = (e) => {
        setPage({ ...page, limit: e.target.value });
    }
    const handleChangePage = (indexPage) => {
        setPage({ ...page, page: indexPage.selected + 1 })
    }
    const confirmDelete = (postId) => {
        postId = posts._id;
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
            handleDeletePost(posts._id);
        }
    };
    return (
        <div className="wrapper-product">
            <div class="container-fluid" style={{ marginBottom: "10px" }}>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Danh sách bài viết</h6>
                    </div>
                </div>
                <div className="justify-content-between" style={{ display: 'flex' }}>
                    <form className="wrapper-search" onSubmit={handleSubmitSearchText}>
                        <input
                            type="text"
                            onChange={onChangeSearch}
                            placeholder="Tìm kiếm...."
                        />
                    </form>
                    <div className="result-product">
                        <span>Result :</span>
                        <select className="custom-se" onChange={onChangeLitmit}>
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
                                <th className="text-center">STT</th>
                                <th className="text-center" style={{ width: "30%" }}>Tên bài viết</th>
                                <th className="text-center">Tên tác giả</th>
                                <th className="text-center">Ngày tạo</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>

                        {loading ? <tbody>
                            {posts?.map((post, index) => {
                                return (
                                    <tr key={post._id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center"><span className="dot">{post.title}</span></td>
                                        <td className="text-center">{`${post.author.firstName} ${post.author.lastName}`}</td>
                                        <td className="text-center">{new Date(post.createdAt).toLocaleDateString()}</td>
                                        <td className="text-center">
                                            <Link to={`/Blog/${post._id}`} className="btn btn-primary"><i class="fas fa-pen-square"></i></Link>
                                            <button
                                                onClick={() => confirmDelete(post._id)}
                                                className="btn btn-warning"><i class="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody> : <Loading />}
                    </table>
                </div>
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
    )
}