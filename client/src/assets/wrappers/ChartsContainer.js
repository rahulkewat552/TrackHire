import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaChartBar, FaChartPie } from "react-icons/fa";

const ChartsContainer = () => {
  const { monthlyApplications, stats } = useAppContext();
  const [activeChart, setActiveChart] = useState('bar');

  const statusData = [
    { name: 'Pending', value: stats?.pending || 0, color: '#f59e0b' },
    { name: 'Interview', value: stats?.interview || 0, color: '#3b82f6' },
    { name: 'Declined', value: stats?.declined || 0, color: '#ef4444' },
  ].filter(item => item.value > 0);

  const COLORS = ['#f59e0b', '#3b82f6', '#ef4444'];

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            {payload[0].value} application{payload[0].value !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = statusData.reduce((sum, item) => sum + item.value, 0);
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">{data.value} applications</p>
          <p className="tooltip-percent">
            {((data.value / total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const monthlyData = monthlyApplications?.slice(-6).map(item => ({
    month: item.date,
    applications: item.count
  })) || [];

  const hasBarData = monthlyData.length > 0;
  const hasPieData = statusData.length > 0;

  if (!hasBarData && !hasPieData) {
    return null;
  }

  return (
    <Wrapper>
      <div className="charts-toggle">
        <button 
          className={`chart-btn ${activeChart === 'bar' ? 'active' : ''}`}
          onClick={() => setActiveChart('bar')}
          disabled={!hasBarData}
        >
          <FaChartBar /> Monthly Trends
        </button>
        <button 
          className={`chart-btn ${activeChart === 'pie' ? 'active' : ''}`}
          onClick={() => setActiveChart('pie')}
          disabled={!hasPieData}
        >
          <FaChartPie /> Status Distribution
        </button>
      </div>

      <div className="charts-container">
        {activeChart === 'bar' && hasBarData && (
          <div className="chart-box">
            <h4 className="chart-title">📊 Monthly Applications</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Bar
                  dataKey="applications"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  name="Applications"
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === 'pie' && hasPieData && (
          <div className="chart-box">
            <h4 className="chart-title">🎯 Status Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 50px;
  margin-left: ${(props) => props.move};
  transition: 0.3s ease-in-out all;
  width: 100%;

  .charts-toggle {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .chart-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.5rem;
    border-radius: 6px;
    background-color: transparent;
    font-size: 1rem;
    font-weight: 600;
    color: #39B5E0;
    border: 2px solid #39B5E0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .chart-btn:hover:not(:disabled) {
    color: #eb55beb0;
    border-color: #eb55beb0;
    transform: translateY(-2px);
  }

  .chart-btn.active {
    background-color: #39B5E0;
    color: white;
  }

  .chart-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .chart-box {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }

  .chart-box:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .chart-title {
    font-size: 1rem;
    font-weight: 600;
    color: #2e2e41a5;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .custom-tooltip {
    background: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #f1f5f9;
    min-width: 120px;
  }

  .tooltip-label {
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 0.25rem;
  }

  .tooltip-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #0f172a;
  }

  .tooltip-percent {
    font-size: 0.85rem;
    color: #94a3b8;
    margin-top: 0.25rem;
  }

  @media (max-width: 640px) {
    .chart-box {
      padding: 1rem;
    }

    .chart-title {
      font-size: 0.9rem;
    }

    .chart-btn {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
    }
  }
`;

export default ChartsContainer;