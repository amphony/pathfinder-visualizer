import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const aStarInOrderNodes = (grid, start, end) => {
  let q = new MinPriorityQueue({ priority: (node) => node.distance });
  let nodesInOrder = [];

  // initialize distance values
  let dist =
    [...Array(30).keys()].map(_ =>
      [...Array(30).keys()].map(_ => Infinity));

  // precompute hueristic values
  let h =
    [...Array(30).keys()].map(x =>
      [...Array(30).keys()].map(y => (Math.abs(x - end[0]) + Math.abs(end[1] - y))));

  // Add all vertices to priority queue
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      dist[i][j] = Infinity;
      q.enqueue({ element: [i, j], distance: Infinity });
    }
  }

  // Initialize start point with distance 0
  dist[start[0]][start[1]] = 0;
  q.enqueue({ element: [start[0], start[1]], distance: 0 });

  // While queue not empty
  while (!q.isEmpty()) {
    const node = q.dequeue();
    const x = node.element.element[0];
    const y = node.element.element[1];
    const priority = node.priority; 
    const uDist = dist[x][y];

    // Hotfix: if dist matrix has positive int, but queue has infinity, skip
    if (priority === Infinity && dist[x][y] != Infinity) continue;
    else if (grid[x][y] == "O") nodesInOrder.push([x, y]);
    else if (grid[x][y] == "E") {
      console.log(`End reachable by ${dist[end[0]][end[1]]} spaces.`);
      console.log(nodesInOrder);
      return nodesInOrder;
    }

    // Check neighbors of node - up, right, down, left
    // update dist(v) if dist(u) + 1 < dist(v)

    // top 
    if (x - 1 >= 0 && grid[x-1][y] !== 'W') {
      const vDist = dist[x-1][y];
      if ((uDist + 1) < vDist) {
        dist[x-1][y] = uDist + 1;
        q.enqueue({ element: [x - 1, y], distance: dist[x-1][y] + h[x-1][y] })
      }
    }
    
    // right
    if (y + 1 < grid[0].length && grid[x][y+1] !== 'W') {
      const vDist = dist[x][y+1];
      if ((uDist + 1) < vDist) {
        dist[x][y+1] = uDist + 1;
        q.enqueue({ element: [x, y + 1], distance: dist[x][y + 1] + h[x][y+1] })
      }
    }

    // down
    if (x + 1 < grid.length && grid[x+1][y] !== 'W') {
      const vDist = dist[x+1][y];
      if ((uDist + 1) < vDist) {
        dist[x+1][y] = uDist + 1;
        q.enqueue({ element: [x + 1, y], distance: dist[x+1][y] + h[x+1][y] })
      }
    }

    // left
    if (y - 1 >= 0 && grid[x][y-1] !== 'W') {
      const vDist = dist[x][y-1];
      if ((uDist + 1) < vDist) {
        dist[x][y-1] = uDist + 1;
        q.enqueue({ element: [x, y-1], distance: dist[x][y-1] + h[x][y-1] })
      }
    }
  }

  return nodesInOrder;
};

export default aStarInOrderNodes;