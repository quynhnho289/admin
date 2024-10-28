import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import './Dashboard.css';
import MetricCard from "./MetricCard.js";
import TransactionsTable from "./TransactionsTable.js";

const Dashboard = () => {
  const pieData = [
    { name: "Group A", value: 30 },
    { name: "Group B", value: 23 },
    { name: "Group C", value: 20 },
    { name: "Group D", value: 15 },
    { name: "Group E", value: 12 },
  ];
  const metrics = [
    //   title="USERS"
    // value="232"
    // change="20%"
    // linkText="See all users"
    // icon="👤"
    {
      title: "USERS",
      value: "232",
      change: "20%",
      linkText: "See all users",
      icon: "👤",
      link: "/users",
    },
    {
      title: "ORDERS",
      value: "34",
      change: "20%",
      linkText: "See all orders",
      icon: "📦",
      link: "/orders",
    },
    {
      title: "PRODUCTS",
      value: "$ 107",
      change: "20%",
      linkText: "See all products",
      icon: "📦",
      link: "/products",
    },
    {
      title: "BALANCE",
      value: "$ 444",
      change: "20%",
      linkText: "See all balance",
      icon: "💰",
      link: "/balance",
    },
  ];
  const areaData = [
    { name: "Feb", uv: 4000 },
    { name: "Mar", uv: 3000 },
    { name: "Apr", uv: 2000 },
    { name: "May", uv: 2780 },
    { name: "Jun", uv: 1890 },
    { name: "Jul", uv: 2390 },
    { name: "Aug", uv: 3490 },
    { name: "Sep", uv: 3000 },
    { name: "Oct", uv: 2000 },
    { name: "Nov", uv: 2780 },
    { name: "Dec", uv: 3890 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="dashboard">
     <div className="metrics-container">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Total Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <h3 className="total-sales">$ 324</h3>
          <p className="sales-description">Total sales made today.</p>
        </div>

        <div className="chart-card">
          <h2>Revenue (Last 1 year)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <TransactionsTable />

      
    </div>
  );
};

export default Dashboard;
