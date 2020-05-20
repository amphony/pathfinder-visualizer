import React from 'react';
import GridItem from '../../components/GridItem';
import Box from '@material-ui/core/Box';
import './styles.css';

const GRID_WIDTH = document.documentElement.clientWidth * 0.70;
const GRID_HEIGHT = (document.documentElement.clientHeight * 0.85) - 40;
const GRID_SIZE = 24;

const Grid = ({
  grid,
  handleClick,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp
}) => {
  return (
    <Box className="grid" boxShadow={10}>
      { grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          { row.map((col, colIndex) => (
            <GridItem
              onClick={e => handleClick(rowIndex, colIndex, e)}
              onMouseDown={e => handleMouseDown(rowIndex, colIndex, e)}
              onMouseEnter={e => handleMouseEnter(rowIndex, colIndex, e)}
              onMouseUp={e => handleMouseUp(rowIndex, colIndex, e)}
              id={`${rowIndex}-${colIndex}`}
              key={`${rowIndex}-${colIndex}`}
              width={GRID_WIDTH/GRID_SIZE}
              height={GRID_HEIGHT/GRID_SIZE}
            />
          ))}
        </div>
      ))}
    </Box>
  );
};

export default Grid;