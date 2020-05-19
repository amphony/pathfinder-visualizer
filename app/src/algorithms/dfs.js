const dfsInOrderNodes = (grid, start, end) => {
  let visited = new Set(`${start[0]}-${start[1]}`);
  let nodesInOrder = [];
  let stk = [start];

  // While queue not empty
  while (stk !== []) {
    const node = stk.pop();
    const x = node[0];
    const y = node[1];

    if (grid[x][y] == "O") {
      visited.add(`${x}-${y}`);
      nodesInOrder.push([x, y]);
    } else if (grid[x][y] == "E") {
      console.log(nodesInOrder);
      return nodesInOrder;
    }

    // Check neighbors of node - up, right, down, left

    // top 
    if (x - 1 >= 0 && grid[x-1][y] !== 'W' && !visited.has(`${x-1}-${y}`)) {
      console.log('top');
      stk.push([x-1, y]);
    }
    
    // right
    if (y + 1 < grid[0].length && grid[x][y+1] !== 'W' && !visited.has(`${x}-${y+1}`)) {
      stk.push([x, y+1]);
    }

    // down
    if (x + 1 < grid.length && grid[x+1][y] !== 'W' && !visited.has(`${x+1}-${y}`)) {
      stk.push([x+1, y]);
    }

    // left
    if (y - 1 >= 0 && grid[x][y-1] !== 'W' && !visited.has(`${x}-${y-1}`)) {
      stk.push([x, y-1]);
    }
  }

  return nodesInOrder;
};

export default dfsInOrderNodes;