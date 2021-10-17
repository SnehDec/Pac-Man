//Breadth first algorithm function that enables ghost movement through maze
//The basis of this code is William Fiset's breadth-first search algorithm

function all_neighbours(cell){
  let row = cell.rowNum;
  let col = cell.colNum;
  let grid = cell.parentGrid;
  let neighbours=[];
  if(row!=grid.length-1 && !grid[row+1][col].walls.topWall){
    neighbours.push([grid[row+1][col], [1, 'y', 1]]);
  }
  if(col!= grid.length-1 && !grid[row][col+1].walls.leftWall){
    neighbours.push([grid[row][col+1], [1, 'x', 1]]);
  }
  if(row!=0 && !grid[row-1][col].walls.bottomWall){
    neighbours.push([grid[row-1][col], [1, 'y', -1]]);
  }
  if(col!=0 && !grid[row][col-1].walls.rightWall){
    neighbours.push([grid[row][col-1], [1, 'x', -1]]);
  }
  return neighbours;
}

//takes a node (cell number from 0 to 169 and converts it to a cell in the form of
//grid[row][col])
function convert_node_to_cell(node, grid){
  let row=parseInt(node/13);
  let col=node-row*13;
  return grid[row][col];
}

function convert_cell_to_node(cell){
  let row = cell.rowNum;
  let col = cell.colNum;
  let node = row*13 + col;
  return node;
}

function solve(s){
let queue = [];
let visited = new Array(169).fill(false);
visited[s] = true;
queue.push(s);
let prev = new Array(169).fill(false);
let directions = [];
while(queue.length!=0){
  let node = queue.pop();
  let cell = convert_node_to_cell(node, mezze.grid);
  let neighbours = [];
  let dirs = [];
  //the code below gets an array of all neighbours for the current node (s)
  // and pushes each node 'n' beside it into the "neighbours" array. Then it pushes
  // the parameters for the "move" command to get from s to each n into dirs array.
  all_neighbours(cell).forEach(function(neighbour){
    neighbours.push(convert_cell_to_node(neighbour[0]));
    dirs.push(neighbour[1]);
  });
  //In the following code, each neighbouring node n is pushed into the queue and
  //the move command from the prev[n], which is the current node s, to n, is
  //pushed into directions. n is marked as visited so it won't be visited again.
  //This process repeats for all the neighbours of each neighbour of s and keeps going
  //"further" out from s until all nodes are visited.
  neighbours.forEach(function(neighbour){
    if (!visited[neighbour]){
      queue.push(neighbour);
      visited[neighbour]=true;
      prev[neighbour] = node;
      directions[neighbour] = dirs[neighbours.indexOf(neighbour)];
    }
  })
}
return [prev, directions];
}

//In the following function, param s is the starting node, param e is ending node.
function construct_path(s, e, prev, directions){
  let path = [];
  let n = e;
  while(n!=s){
    //we move backwards from e to s
  let next = prev[n];
  //directions[n] will contain directions from next to n
  path.push(directions[n]);
  n = next;
}
return path.reverse();
}

function shortest_path(s, e){
  let arr = solve(s);
  let path = construct_path(s, e, arr[0], arr[1]);
  return path;
}
