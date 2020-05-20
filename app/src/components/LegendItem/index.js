import React from 'react';
import './styles.css';

const GRID_WIDTH = document.documentElement.clientWidth * 0.70;
const GRID_HEIGHT = (document.documentElement.clientHeight * 0.85) - 40;
const GRID_SIZE = 24;

const LegendItem = ({ label, color }) => {
  return (
    <div className="legend-item-container">
      <div
        className="legend-item"
        style={{
          width: `${(GRID_WIDTH/GRID_SIZE)*.60}px`,
          height: `${(GRID_HEIGHT/GRID_SIZE)*.60}px`,
          backgroundColor: color
        }}
      >
      </div>
      <span>{label}</span>
    </div>
  )
};

export default LegendItem;