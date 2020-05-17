import React from 'react';
import './styles.css';

const GridItem = props => {
  return (
    <div
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      onMouseUp={props.onMouseUp}
      id={props.id}
      className="GridItem"
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    >
    </div>
  )
};

export default GridItem;