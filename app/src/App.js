import React from 'react';
import Grid from './containers/Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h2>Pathfinding Visualizer</h2>
      </header>
      <Grid />
    </div>
  );
}

export default App;
