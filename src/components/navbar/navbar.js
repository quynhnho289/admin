import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Navbar(props) {
    const history = useHistory();
    const toggleNavbar = useSelector(state => state.toggleNavbar);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active4, setActive4] = useState(false);
    const [active3, setActive3] = useState(false);
    const signOut = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userID')
        history.push('/login')
    }
    const handleActive = (value) => {
        console.log(value)
        switch (value) {
            case 1:
                setActive1(!active1);
                break;
            case 2:
                setActive2(!active2);
                break;
            case 4:
                setActive4(!active4);
                break;
            case 3:
                setActive3(!active3);
                break;
            default:
                return;
        }
    }
    return (
        <div id="wrapper" style={{ height: '100%' }}>
            <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${!toggleNavbar ? "toggled" : ""}`} id="accordionSidebar">

                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Book Shop <sup><i class="fas fa-book"></i></sup></div>
                </Link>

                <li className="nav-item active">
                    <span className="nav-link" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Trang home</span>
                    </span>
                </li>
                <li className="nav-item" onClick={() => handleActive(1)}>
                    <span className="nav-link collapsed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", cursor: 'pointer' }}>
                        <span>
                            <i className="fas fa-tasks"></i>
                            Sản phẩm
                        </span>
                        <i className="fas fa-chevron-right"></i>
                    </span>
                    <Collapse
                        isOpened={active1}
                    >
                        <div id="collapsePages" className={`collapse ${active1 ? "show" : ''}`} >
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Quản lý</h6>
                                <Link className="collapse-item" to="/product/list">Danh sách sản phẩm</Link>
                                <Link className="collapse-item" to="/product/category" >Gian hàng sản phẩm</Link>
                                <Link className="collapse-item" to='/product/type'>Thể loại, nhà xuất bản</Link>
                            </div>
                        </div>
                    </Collapse>
                </li>
                <li className="nav-item">
                        <Link to="/Revenue" className="nav-link collapsed" style={{ cursor: 'pointer', display: 'flex' }}>
                        <i className="fas fa-dollar-sign"></i>
                        <span>Doanh thu</span>
                        </Link>
                </li>
                <li className="nav-item">
                        <Link to="/Dashboard" className="nav-link collapsed" style={{ cursor: 'pointer', display: 'flex' }}>
                        <i className="fas fa-dollar-sign"></i>
                        <span>Tester</span>
                        </Link>
                </li>
                <li className="nav-item">
                    <Link to="/code" className="nav-link collapsed" style={{ cursor: "pointer", display: 'flex' }}>
                        <i class="fas fa-code"></i>
                        <span>Mã giảm giá</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link collapsed" style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <span onClick={() => handleActive(2)} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-book-open"></i>
                            Bài viết
                        </span>
                        <i className="fas fa-chevron-right"></i>
                    </span>
                    <Collapse isOpened={active2}>
                        <div id="collapsePages" className={`collapse ${active2 ? "show" : ''}`}>
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Quản lý</h6>
                                <Link to="/Blog" className="collapse-item">Danh sách bài viết</Link>
                                <Link to="/Blog/add" className="collapse-item">Tạo bài viết</Link>
                            </div>
                        </div>
                    </Collapse>
                </li>
                <li className="nav-item">
                    <span className="nav-link collapsed" style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <span onClick={() => handleActive(3)} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-book-open"></i>
                            Người dùng
                        </span>
                        <i className="fas fa-chevron-right"></i>
                    </span>
                    <Collapse isOpened={active3}>
                        <div id="collapsePages" className={`collapse ${active3 ? "show" : ''}`}>
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Quản lý</h6>
                                <Link to="/users/list" className="collapse-item">Danh sách người dùng</Link>
                                <Link to="/users/add" className="collapse-item">Tạo tài khoản</Link>
                            </div>
                        </div>
                    </Collapse>
                </li>
                <li className="nav-item">
                    <Link to="/orders" className="nav-link collapsed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", cursor: 'pointer' }}>
                        <span style={{ cursor: "pointer" }}>
                            <i className="fas fa-book-open"></i>
                            Đơn Hàng
                        </span>
                    </Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link collapsed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", cursor: 'pointer' }}>
                        <span onClick={() => handleActive(4)} style={{ cursor: "pointer" }}>
                            <i className="fas fa-user"></i>
                            Tài khoản
                        </span>
                        <i className="fas fa-chevron-right"></i>
                    </span>
                    <Collapse isOpened={active4}>
                        <div id="collapsePages" className={`collapse ${active4 ? "show" : ''}`} >
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Chi tiết tài khoản</h6>
                                <Link to="/profile" className="collapse-item" >Profile</Link>
                                <span
                                    onClick={signOut}
                                    className="collapse-item" >Đăng xuất</span>
                            </div>
                        </div>
                    </Collapse>
                </li>

            </ul>
        </div>
    );
}

export default Navbar;