import React from 'react';
import './styles.css';

const GridItem = props => {
  return (
    <div
      className="GridItem"
      onClick={props.onClick}
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        backgroundColor: `${props.visited ? '#e74c3c' : '#ecf0f1'}`
      }}
    >
    </div>
  )
};

export default GridItem;