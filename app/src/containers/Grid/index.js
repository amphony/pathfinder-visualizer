import React, { useState } from 'react';
import GridItem from '../../components/GridItem';
import Box from '@material-ui/core/Box';
import './styles.css';

const GRID_WIDTH = 600;
const GRID_HEIGHT = 400;
const GRID_SIZE = 20;

const Grid = () => {
  function generateGrid() {
    let grid = new Array(GRID_SIZE);

    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = new Array(GRID_SIZE);
      for (let j = 0; j < GRID_SIZE; j++) {
        grid[i][j] =
          <GridItem
            key={i+'-'+j}
            visited={false}
            onClick={() => onChange(i, j)}
            width={GRID_WIDTH/GRID_SIZE}
            height={GRID_HEIGHT/GRID_SIZE}
          />;
      }
    }

    return grid;
  };

  const [grid, updateGrid] = useState(generateGrid());

  const onChange = (i, j) => {
    let updatedGrid = [...grid];
    updatedGrid[i][j] =
      <GridItem
        key={i+'-'+j}
        visited={!updatedGrid[i][j].props.visited}
        onClick={() => onChange(i, j)}
        width={GRID_WIDTH/GRID_SIZE}
        height={GRID_HEIGHT/GRID_SIZE}
      />
    updateGrid(updatedGrid);
  };

  // const blowUp = () => {
  //   for (let i = 0; i < GRID_SIZE; i++) {
  //     for (let j = 0; j < GRID_SIZE; j++) {
  //       setTimeout(onChange(i, j), 10000);
  //     }
  //   }
  // };

  return (
    <Box className="Grid" boxShadow={10}>
      { grid.map((row, rowIdx) => (
        <div className="row" key={rowIdx}>
          { row.map(cell => cell) }
        </div>
      ))}
      {/* <button onClick={() => blowUp()}>Click</button> */}
    </Box>
  );
};

export default Grid;