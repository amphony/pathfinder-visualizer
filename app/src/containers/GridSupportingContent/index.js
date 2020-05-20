import React from 'react';
import LegendItem from '../../components/LegendItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import './styles.css';

const GridSupportingContent = ({
  algorithm,
  speed,
  handleSelectChange,
  handleSliderChange,
  processAlgorithm
}) => {
  return (
    <div className="grid-supporting-content">
      <Box className="options-container" boxShadow={10}>
        <div id="options-title-container">
          <h4 id="options-title">Choose Options</h4>
          <hr />
        </div>
        <div className="options">
          <FormControl id="algo-select">
            <InputLabel>Algorithm</InputLabel>
            <Select
              value={algorithm}
              onChange={handleSelectChange}
            >
              <MenuItem value="Dijkstra" selected>Dijkstra</MenuItem>
              <MenuItem value="Astar">A Star</MenuItem>
              <MenuItem value="Dfs">Depth-first Search</MenuItem>
            </Select>
          </FormControl>
          <div id="speed-slider">
            <Typography id="speed-slider-title" gutterBottom>
              Speed
            </Typography>
            <Slider
              marks
              step={10}
              min={10}
              max={90}
              value={100 - speed}
              onChange={handleSliderChange}
            >
            </Slider>
          </div>
        </div>
        <div id="action-container">
          <Button
            id="start-button"
            variant="contained"
            onClick={processAlgorithm}
          >
            Start!
          </Button>
        </div>
      </Box>
      <Box id="legend-section" boxShadow={10}>
        <div id="legend-title-container">
          <h3 id="legend-title">Legend</h3>
          <hr />
        </div>
        <div id="legend-container">
          <div className="legend-row">
            <LegendItem label="Start" color="#16a085" />
            <LegendItem label="End" color="#c0392b" />
          </div>
          <div className="legend-row">
            <LegendItem label="Wall" color="#34495e" />
            <LegendItem label="Path" color="#f1c40f" />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default GridSupportingContent;