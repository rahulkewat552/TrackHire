import React from "react";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import { 
  FaSuitcase, 
  FaHourglassHalf, 
  FaCalendarCheck, 
  FaTimesCircle 
} from "react-icons/fa";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: 'Total Applications',
      count: Object.values(stats || {}).reduce((acc, val) => acc + val, 0),
      icon: <FaSuitcase />,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#3b82f6',
    },
    {
      title: 'Pending',
      count: stats?.pending || 0,
      icon: <FaHourglassHalf />,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      borderColor: '#f59e0b',
    },
    {
      title: 'Interview',
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      borderColor: '#8b5cf6',
    },
    {
      title: 'Declined',
      count: stats?.declined || 0,
      icon: <FaTimesCircle />,
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#ef4444',
    },
  ];

  const total = defaultStats[0].count;

  return (
    <Wrapper>
      <div className="stats-grid">
        {defaultStats.map((item, index) => (
          <div 
            key={index} 
            className="stat-card"
            style={{ borderBottomColor: item.borderColor }}
          >
            <div className="stat-header">
              <span className="stat-title">{item.title}</span>
              <span 
                className="stat-icon"
                style={{ 
                  color: item.color, 
                  backgroundColor: item.bgColor 
                }}
              >
                {item.icon}
              </span>
            </div>
            <div className="stat-count">{item.count}</div>
            <div className="stat-progress">
              <div 
                className="stat-progress-bar"
                style={{
                  width: `${total > 0 ? Math.min((item.count / total) * 100, 100) : 0}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-bottom: 4px solid var(--primary-500);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    position: relative;
    z-index: 1;
  }

  .stat-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.25rem;
    transition: all 0.3s ease;
  }

  .stat-card:hover .stat-icon {
    transform: scale(1.1) rotate(-5deg);
  }

  .stat-count {
    font-size: 2.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.75rem;
    position: relative;
    z-index: 1;
    letter-spacing: -1px;
  }

  .stat-progress {
    height: 4px;
    background: #f1f5f9;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .stat-progress-bar {
    height: 100%;
    border-radius: 2px;
    transition: width 1s ease-in-out;
  }

  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .stat-count {
      font-size: 2rem;
    }

    .stat-title {
      font-size: 0.75rem;
    }

    .stat-icon {
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }
  }
`;

export default StatsContainer;