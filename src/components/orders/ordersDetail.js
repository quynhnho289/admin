import React from 'react';

function ordersDetail(props) {
    const { ordersDetail, handleToggleBtn, handleStatus } = props;
    return (
        <div class="wrapper-orders">
            <div class="card card-1">
                <div class="card-body">
                    <div class="row justify-content-between mb-3">
                        <div class="col-auto">
                            <h6 class="color-1 mb-0 change-color">Chi tiết sản phẩm</h6>
                        </div>
                        <div class="col-auto "> <small>Mã đơn hàng : {ordersDetail._id}</small> </div>
                    </div>
                    <ul class="row p-0" style={{ display: 'block', overflow: 'auto', maxHeight: '210px' }}>
                        {ordersDetail.productDetail ? ordersDetail.productDetail.map(product => {
                            return (
                                <li class="col" style={{ listStyle: 'none' }} key={product._id}>
                                    <div class="card card-2">
                                        <div class="card-body">
                                            <div class="media">
                                                <div class="sq align-self-center "> <img class="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0" src={product.productID?.urls[0].url} width="50" height="50" alt={product.productID?.title} /> </div>
                                                <div class="media-body my-auto text-right">
                                                    <div class="row my-auto flex-column flex-md-row">
                                                        <div class="col my-auto">
                                                            <h6 class="mb-0"> {product.productID?.title}</h6>
                                                        </div>
                                                        <div class="col my-auto"> <small>Qty : {product?.quantity}</small></div>
                                                        <div class="col my-auto">
                                                            <h6 class="mb-0">{product.productID?.price} đ</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }) : ''}
                    </ul>
                    <div class="row mt-4">
                        <div class="col">
                            <div class="row justify-content-between">
                                <div class="col-auto">
                                    <p class="mb-1 text-dark"><b>Chi tiết đơn hàng</b></p>
                                </div>
                                <div class="flex-sm-col text-right col">
                                    <p class="mb-1"><b>Tổng tiền sản phẩm</b></p>
                                </div>
                                <div class="flex-sm-col col-auto">
                                    <p class="mb-1">
                                        {ordersDetail.productDetail.reduce((t, p) => t + (p.productID.price * p.quantity), 0)}
                                    </p>
                                </div>
                            </div>
                            <div class="row justify-content-between">
                                <div class="flex-sm-col text-right col">
                                    <p class="mb-1"> <b>Mã giảm giá áp dụng :</b></p>
                                </div>
                                <div class="flex-sm-col col-auto">
                                    <p class="mb-1">{ordersDetail?.saleCode?.code || "Không"}</p>
                                </div>
                            </div>
                            <div class="row justify-content-between">
                                <div class="flex-sm-col text-right col">
                                    <p class="mb-1"> <b>Giảm giá</b></p>
                                </div>
                                <div class="flex-sm-col col-auto">
                                    <p class="mb-1">{`-${ordersDetail?.saleCode?.discount || "0"} ${ordersDetail?.saleCode?.type || ""}`}</p>
                                </div>
                            </div>
                            <div class="row justify-content-between">
                                <div class="flex-sm-col text-right col">
                                    <p class="mb-1"> <b>Tổng cộng</b></p>
                                </div>
                                <div class="flex-sm-col col-auto">
                                    <p class="mb-1">{ordersDetail.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row invoice ">
                        <div class="col">
                            <p class="mb-1"> Email người đặt : {ordersDetail.email}</p>
                            <p class="mb-1"> Địa chỉ giao : {ordersDetail.address}</p>
                            <p class="mb-1"> Ngày đặt : {new Date(ordersDetail.createdAt).toLocaleDateString()}</p>
                            <p class="mb-1">  Số điện thoại: {ordersDetail.phone}</p>
                            <p class="mb-1"> Trạng thái : {handleStatus(ordersDetail.status)}</p>
                            <button
                                onClick={() => handleToggleBtn(false)}
                                class="mb-1 btn btn-primary">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ordersDetail;