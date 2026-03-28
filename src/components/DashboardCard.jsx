// src/components/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ title, count }) => {
  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
};

export default DashboardCard;
