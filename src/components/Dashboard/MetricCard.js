import React from 'react';

const MetricCard = ({ title, value, change, linkText, icon,link }) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        <span className="metric-change">▲ {change}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-footer">
        <a href={link} className="metric-link">{linkText}</a>
        <span className="metric-icon">{icon}</span>
      </div>

      <style jsx>{`
   
      `}</style>
    </div>
  );
};

export default MetricCard;