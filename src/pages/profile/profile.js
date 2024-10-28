import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Profile(props) {
    const profile = useSelector(state => state.profile);
    return (
        <div class="container">
            <div class="main-body">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Profile</h6>
                    </div>
                </div>
                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={profile.image} alt="Admin" class="rounded-circle" width="150" />
                                    <div class="mt-3">
                                        <h4>{`${profile.firstName} ${profile.lastName}`}</h4>
                                        <p class="text-secondary mb-1">{profile.role}</p>
                                        <p class="text-muted font-size-sm">{profile.address ? profile.address : "Chưa cập nhật"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Full Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {`${profile.firstName} ${profile.lastName}`}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {profile.email}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">SĐT</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        (84) {profile.phone}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Quyền</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {profile.role}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Địa chỉ</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        {profile.address ? profile.address : "Chưa cập nhật"}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-12">
                                        <Link class="btn btn-info " to="/profile/edit">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;