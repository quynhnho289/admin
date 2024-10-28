import React from 'react';

const TransactionsTable = () => {
  const transactions = [
    { id: '23423343', product: 'Programming Book 1', customer: 'Devid John', amount: 45, date: '3 October, 2022', paymentStatus: 'Online Payment', status: 'Approved' },
    { id: '235343343', product: 'Programming Book 2', customer: 'Julia Ani', amount: 55, date: '23 April, 2022', paymentStatus: 'Cash On Delivery', status: 'Pending' },
    { id: '234239873', product: 'Programming Book 3', customer: 'John Smith', amount: 25, date: '10 October, 2022', paymentStatus: 'Online Payment', status: 'Approved' },
    { id: '23423143', product: 'Programming Book 4', customer: 'Devid John', amount: 40, date: '3 March, 2022', paymentStatus: 'Cash On Delivery', status: 'Approved' },
    { id: '123423343', product: 'Programming Book 5', customer: 'Humlar', amount: 45, date: '20 November, 2022', paymentStatus: 'Online Payment', status: 'Approved' },
    { id: '2333343', product: 'Programming Book 6', customer: 'Devid John', amount: 28, date: '12 June, 2022', paymentStatus: 'Cash On Delivery', status: 'Pending' },
  ];

  return (
    <div className="transactions-table">
      <h2>Latest Transactions</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tracking Id</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <div className="tracking-id">
                    <img src={`/placeholder.svg?height=40&width=40`} alt={transaction.product} />
                    <span>{transaction.id}</span>
                  </div>
                </td>
                <td>{transaction.product}</td>
                <td>{transaction.customer}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.paymentStatus}</td>
                <td>
                  <span className={`status ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default TransactionsTable;
