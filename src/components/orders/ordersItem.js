import React, { useEffect, useState } from 'react';

function OrdersItem(props) {
    const { order, handleChangeStatusOrders, handleDetailsOrders, index } = props;
    return (
        <tr key={order._id}>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{`${order.userID.firstName} ${order.userID.lastName}`}</td>
            <td className="text-center">{order.address}</td>
            <td className="text-center">{order.userID.phone}</td>
            <td className="text-center">{new Date(order.createdAt).toLocaleString()}</td>
            <td className="text-center">
                <select
                    className="select-cus"
                    onChange={(e) => handleChangeStatusOrders(e, order._id)}
                    defaultValue={order.status}
                >
                    <option value={0}>Chờ xác nhận</option>
                    <option value={1}>Đã xác nhận</option>
                    <option value={2}>Đang giao hàng</option>
                    <option value={3}>Đã giao hàng</option>
                </select>
            </td>
            <td className="text-center">
                <span
                    onClick={() => handleDetailsOrders(order, true)}
                    className="details-order"
                >
                    <i className="fas fa-info-circle"></i>
                </span>
            </td>
        </tr>
    );
}

export default OrdersItem;