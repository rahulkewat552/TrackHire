import React, { useEffect, useState } from "react";
import StatsContainer from "../../assets/wrappers/StatsContainer";
import ChartsContainer from "../../assets/wrappers/ChartsContainer";
import { useAppContext } from "../../context/appContext";
import styled from "styled-components";

const Stats = () => {
  const { getStats, monthlyApplications, stats, isLoading } = useAppContext();
  const [error, setError] = useState(null);

 useEffect(() => {
  getStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // ← Empty array means "run only once"n

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>{error}</p>
        <button onClick={() => { setError(null); getStats(); }}>
          Retry
        </button>
      </div>
    );
  }

  const hasData = stats && Object.values(stats).some(val => val > 0);

  return (
    <Wrapper>
      <h2>Analytics Dashboard</h2>
      <p>Track your job application progress</p>
      <StatsContainer />
      {hasData && monthlyApplications?.length > 0 && <ChartsContainer />}
      {!hasData && <p>No applications to display yet.</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export default Stats;