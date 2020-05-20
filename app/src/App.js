import React, { useState } from 'react';
import Grid from './containers/Grid';
import GridSupportingContent from './containers/GridSupportingContent';
import aStarInOrderNodes from './algorithms/astar';
import dfsInOrderNodes from './algorithms/dfs';
import dijkstraInOrderNodes from './algorithms/dijkstra';
import './App.css';

const GRID_SIZE = 24;

function App() {
  // need 
  const [grid, updateGrid] =
    useState([...Array(GRID_SIZE).keys()].map(_ =>
      [...Array(GRID_SIZE).keys()].map(_ => 'O'))); 
  const [startExists, setStart] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [endExists, setEnd] = useState(false);
  const [endPos, setEndPos] = useState(null);
  const [isSettingWalls, toggleWalls] = useState(false);
  const [walls, setWalls] = useState([]);
  const [algorithm, setAlgorithm] = useState('Dijkstra');
  const [speed, setSpeed] = useState(10);

  // helper functions
  // click for start and end positions
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

  // mouse handlers for wall creation
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
  };

  const handleSelectChange = e => {
    setAlgorithm(e.target.value);
  };

  const handleSliderChange = (e, newValue) => {
    setSpeed(100 - newValue);
  };

  const animateNodesFrom = (nodesInOrder) => {
    for (let i = 0; i < nodesInOrder.length; i++) {
      setTimeout(() => {
        let el = document.getElementById(`${nodesInOrder[i][0]}-${nodesInOrder[i][1]}`);
        el.classList += ' visited';
      }, speed * i);
    }
  };

  const processAlgorithm = () => {
    if (algorithm === "Dijkstra") {
      animateNodesFrom(dijkstraInOrderNodes(grid, startPos, endPos));
    } else if (algorithm === "Dfs") {
      animateNodesFrom(dfsInOrderNodes(grid, startPos, endPos));
    } else if (algorithm === "Astar") {
      animateNodesFrom(aStarInOrderNodes(grid, startPos, endPos));
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <h2>Pathfinding Visualizer</h2>
      </header>
      <div className="app-body">
        <Grid 
          grid={grid}
          handleClick={handleClick}
          handleMouseDown={handleMouseDown}   
          handleMouseEnter={handleMouseEnter}
          handleMouseUp={handleMouseUp}
        />
        <GridSupportingContent
          algorithm={algorithm}
          speed={speed}
          handleSelectChange={handleSelectChange} 
          handleSliderChange={handleSliderChange}
          processAlgorithm={processAlgorithm}
        />
      </div>
    </div>
  );
}

export default App;
