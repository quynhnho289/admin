import React from 'react';
import NavbarAdmin from '../../components/navbar/navbar';
import HeaderAdmin from '../../components/header/header';
import { useSelector } from 'react-redux';
function Common(props) {
    const profile = useSelector(state => state.profile);
    const toggleNavbar = useSelector(state => state.toggleNavbar);
    return (
        <div className="container-fluild">
            <div className="row no-gutters">
                <div className={`col-${toggleNavbar ? '2' : ''}`}>
                    <NavbarAdmin></NavbarAdmin>
                </div>
                <div className={`col-${toggleNavbar ? '10' : '12'}  no-gutters position-relative ${toggleNavbar ? 'p-reponsive' : ''}`}>
                    <HeaderAdmin profile={profile}></HeaderAdmin>
                    {props.children}
                </div>
            </div>
        </div>
    );
}



export default Common;