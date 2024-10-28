import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleNavbar } from '../../action/index';

function Header(props) {
    const dispatch = useDispatch();
    const { profile } = props;
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                    onClick={() => dispatch(toggleNavbar())}
                    id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>

                    <li className="nav-item dropdown no-arrow">
                        <span className="nav-link dropdown-toggle" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{`${profile.firstName} ${profile.lastName}`}</span>
                            <img className="img-profile rounded-circle" src={profile.image} alt="Ảnh đại diện">
                            </img>
                        </span>
                    </li>
                </ul>

            </nav >
        </div >
    );
}

export default Header;