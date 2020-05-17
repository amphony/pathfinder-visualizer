import React, { useState } from 'react';
import GridItem from '../../components/GridItem';
import Box from '@material-ui/core/Box';
import dijkstraInOrderNodes from '../../algorithms/dijksra';
import './styles.css';

const GRID_WIDTH = 600;
const GRID_HEIGHT = 400;
const GRID_SIZE = 20;

const Grid = () => {
  // initial grid filled with "O"s, open squares
  const [grid, updateGrid] =
    useState([...Array(GRID_SIZE).keys()].map(_ =>
      [...Array(GRID_SIZE).keys()].map(_ => 'O'))); 
  const [startExists, setStart] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [endExists, setEnd] = useState(false);
  const [endPos, setEndPos] = useState(null);
  const [isSettingWalls, toggleWalls] = useState(false);
  const [walls, setWalls] = useState([]);

  // helper functions
  const handleClick = (rowIndex, colIndex, e) => {
    const cell = e.target;

    if (!startExists) {
      cell.classList += ' start';
      let updatedGrid = grid;
      updatedGrid[rowIndex][colIndex] = 'S';
      updateGrid(updatedGrid);
      setStart(true);
      setStartPos([rowIndex, colIndex]);
    } else if (startExists && !endExists) {
      cell.classList += ' end';
      let updatedGrid = grid;
      updatedGrid[rowIndex][colIndex] = 'E';
      updateGrid(updatedGrid);
      setEnd(true);
      setEndPos([rowIndex, colIndex]);
    }
  };

  const handleMouseDown = (rowIndex, colIndex, e) => {
    if (startExists && endExists) {
      const cell = e.target;
      toggleWalls(true);
      setWalls([...walls, [rowIndex, colIndex]]);
      cell.classList += ' wall';
    }
  };

  const handleMouseEnter = (rowIndex, colIndex, e) => {
    if (isSettingWalls) {
      setWalls([...walls, [rowIndex, colIndex]]);
      e.target.classList += ' wall';
    }
  };

  const handleMouseUp = (rowIndex, colIndex, e) => {
    toggleWalls(false);
    let updatedGrid = grid;
    for (const wall of walls) {
      updatedGrid[wall[0]][wall[1]] = 'W';
    }
    setWalls([]);
    updateGrid(updatedGrid);
    console.log(grid);
  };

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
      <button onClick={() => dijkstraInOrderNodes(grid, startPos, endPos)}>Dijkstra</button>
    </Box>
  );
};

export default Grid;