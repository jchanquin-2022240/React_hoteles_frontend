import React from 'react';
import { Link } from 'react-router-dom';
import Hotel from '../hotel/Hotel'

export const DashboardPage = () => {
  return (
    <div>
      <Link to="/hotel">View Hotels</Link>
    </div>
  );
};