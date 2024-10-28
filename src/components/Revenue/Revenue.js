import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Revenue.css';

const Revenue = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ day: '', month: '', year: '' });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const fetchRevenueData = async (applyFilter = false) => {
    setLoading(true);
    setError(null);
    try {
      // Kiểm tra nếu applyFilter là true và không có giá trị nào được nhập
      if (applyFilter && !filter.day && !filter.month && !filter.year) {
        toast.error('Vui lòng nhập ít nhất một giá trị để lọc', {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true
        });
        setLoading(false);
        return;
      }

      // Chỉ gửi các tham số có giá trị nếu applyFilter là true
      const params = {};
      if (applyFilter) {
        if (filter.day) params.day = filter.day;
        if (filter.month) params.month = filter.month;
        if (filter.year) params.year = filter.year;
      }

      const response = await axios.get('http://localhost:5000/api/revenue/total', { params });

      // Lọc dữ liệu phía client nếu applyFilter là true
      let filteredOrders = response.data.orders;
      
      if (applyFilter && (filter.year || filter.month || filter.day)) {
        filteredOrders = filteredOrders.filter(order => {
          const orderDate = new Date(order.createdAt);
          
          // Lọc theo năm nếu có
          if (filter.year && orderDate.getFullYear() !== parseInt(filter.year)) {
            return false;
          }
          
          // Lọc theo tháng nếu có
          if (filter.month && (orderDate.getMonth() + 1) !== parseInt(filter.month)) {
            return false;
          }
          
          // Lọc theo ngày nếu có
          if (filter.day && orderDate.getDate() !== parseInt(filter.day)) {
            return false;
          }
          
          return true;
        });
      }

      // Tính toán tổng tiền từ đơn hàng đã lọc
      const totalRevenue = filteredOrders.reduce((sum, order) => {
        // Kiểm tra nếu totalAmount là string thì parse số từ string
        const amount = typeof order.totalAmount === 'string' 
          ? parseInt(order.totalAmount.replace('đ', '')) 
          : order.totalAmount;
        return sum + (amount || 0);
      }, 0);

      setRevenueData({
        ...response.data,
        orders: filteredOrders,
        totalRecords: filteredOrders.length,
        totalRevenue: totalRevenue
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset bộ lọc
  const handleReset = () => {
    setFilter({ day: '', month: '', year: '' });
    fetchRevenueData();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatCurrency = (amount) => {
    // Xử lý cả trường hợp amount là string hoặc number
    if (typeof amount === 'string') {
      amount = parseInt(amount.replace('đ', ''));
    }
    return `${amount.toLocaleString('vi-VN')}đ`;
  };

  const renderLoading = () => (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>
  );

  const renderError = () => (
    <div className="error-container">
      <p className="error-message">Lỗi: {error}</p>
      <button onClick={fetchRevenueData} className="retry-button">Thử lại</button>
    </div>
  );

  const renderRevenueData = () => (
    <div className="revenue-container">
      <h2 className="header">Quản lí Doanh thu</h2>

      <div className="filter-container">
        <label>
          Ngày:
          <input 
            type="number" 
            name="day" 
            value={filter.day} 
            onChange={handleInputChange}
            min="1"
            max="31"
            placeholder="Ngày" 
          />
        </label>
        <label>
          Tháng:
          <input 
            type="number" 
            name="month" 
            value={filter.month} 
            onChange={handleInputChange}
            min="1"
            max="12"
            placeholder="Tháng"
          />
        </label>
        <label>
          Năm:
          <input 
            type="number" 
            name="year" 
            value={filter.year} 
            onChange={handleInputChange}
            min="2000"
            placeholder="Năm"
          />
        </label>
        <div className="button-group">
          <button 
            onClick={() => fetchRevenueData(true)}
            className="filter-button"
          >
            Lọc
          </button>
          <button 
            onClick={handleReset}
            className="reset-button"
          >
            Đặt lại
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="revenue-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Giá tiền đơn hàng</th>
              <th>Ngày giao</th>
            </tr>
          </thead>
          <tbody>
            {revenueData?.orders && revenueData.orders.length > 0 ? (
              revenueData.orders.map((order) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <p><strong>Tổng đơn hàng:</strong> {revenueData?.totalRecords || 0}</p>
        <p><strong>Tổng tiền đơn hàng:</strong> {formatCurrency(revenueData?.totalRevenue || 0)}</p>
      </div>
    </div>
  );

  return (
    <>
      {loading ? renderLoading() : error ? renderError() : renderRevenueData()}
    </>
  );
};

export default Revenue;