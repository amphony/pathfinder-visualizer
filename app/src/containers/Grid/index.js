import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import GridItem from '../../components/GridItem';
import Box from '@material-ui/core/Box';
import dijkstraInOrderNodes from '../../algorithms/dijksra';
import './styles.css';

const GRID_WIDTH = document.documentElement.clientWidth * 0.70;
const GRID_HEIGHT = (document.documentElement.clientHeight * 0.85) - 40;
const GRID_SIZE = 24;

const Grid = () => {
  // initial grid filled with "O"s, open squares
  const [algorithm, setAlgorithm] = useState('Dijkstra');
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

  const handleChange = e => {
    setAlgorithm(e.target.value);
  }

  const processAlgorithm = () => {
    if (algorithm === "Dijkstra") {
      animateNodesFrom(dijkstraInOrderNodes(grid, startPos, endPos));
    }
  }

  const animateNodesFrom = (nodesInOrder) => {
    for (let i = 0; i < nodesInOrder.length; i++) {
      setTimeout(() => {
        let el = document.getElementById(`${nodesInOrder[i][0]}-${nodesInOrder[i][1]}`);
        el.classList += ' visited';
      }, 10 * i);
    }
  };

  const generateLegendItem = (label, color) => {
    return (
      <div className="legend-item-container">
        <div
          class="legend-item"
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

  return (
    <div className="grid-container">
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
      <div className="grid-right-section">
        <Box className="options-container" boxShadow={10}>
          <div>
            <h4 id="options-title">Choose Options</h4>
            <hr style={{ border: '1px solid rgba(0, 0, 0, 0.5)', width: '100%' }}></hr>
          </div>
          <div className="options">
            <FormControl id="algo-select">
              <InputLabel
                id="demo-simple-select-label"
              >
                Algorithm
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={algorithm}
                onChange={handleChange}
              >
                <MenuItem value="Dijkstra" selected>Dijkstra</MenuItem>
                <MenuItem value="A Star">A Star</MenuItem>
                <MenuItem value="Depth-first Search">Depth-first Search</MenuItem>
              </Select>
            </FormControl>
            <div id="speed-slider">
              <Typography
                id="discrete-slider"
                gutterBottom
                style={{ textAlign: 'left' }}
              >
                Speed
              </Typography>
              <Slider
                defaultValue={20}
                step={10}
                marks
                min={10}
                max={100}
              >
              </Slider>
            </div>
          </div>
          <div id="action-section">
            <Button
              onClick={processAlgorithm}
              id="button-start"
              variant="contained"
            >
              Start!
            </Button>
          </div>
        </Box>
        <Box id="legend-section" boxShadow={10}>
          <div>
            <h3 id="legend-title">Legend</h3>
            <hr style={{ border: '1px solid rgba(0, 0, 0, 0.5)', width: '80%' }}></hr>
          </div>
          <div id="legend-container">
            <div className="legend-row">
              { generateLegendItem('Start', '#16a085') }
              { generateLegendItem('End', '#c0392b') }
            </div>
            <div className="legend-row">
              { generateLegendItem('Wall', '#34495e') }
              { generateLegendItem('Path', '#f1c40f') }
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Grid;