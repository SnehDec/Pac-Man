// Modified version of DEPTH FIRST SEARCH MAZE IMPLEMENTATION IN JAVASCRIPT BY CONOR BAILEY
//to create maze in which Pac-Man and ghosts move in.

// Initialize the canvas
let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;

let current;

class Maze {
  constructor(size, rows, columns) {
    this.size = size;
    this.columns = columns;
    this.rows = rows;
    this.grid = [];
    this.stack = [];
  }

  // Set the grid: Create new this.grid array based on number of instance rows and columns
  setup() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // Create a new instance of the Cell class for each element in the 2D array and push to the maze grid array
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }
      this.grid.push(row);
    }
    // Set the starting grid
    current = this.grid[0][0];
  }

  // Draw the canvas by setting the size and placing the cells in the grid array on the canvas.
  draw() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = "black";
    // Set the first cell as visited
    current.visited = true;
    this.make_maze();

    //The following code was added by me (Sneha) to remove walls at random from <=10 cells.
    // This introduces more forks in paths in the maze which gives Pac-Man a better chance
    //of escaping ghosts by taking alternate routes. Without this, Pac-Man cannot
    //even make it past level 1.
    let row =Math.floor(Math.random()*10 + 1)
    //picks a random row, with the exception of the first and last row

    let count=0;
    //makes sure a maximum of 10 cells have their walls removed

    let cell = Math.floor(Math.random()*10+1);
    //picks a random column

    while (count<=10){

    if(this.grid[row][cell].walls.rightWall==true){
      this.grid[row][cell].walls.rightWall = false;
      this.grid[row][cell+1].walls.leftWall = false;
    }
    else if(this.grid[row][cell].walls.topWall==true){
      this.grid[row][cell].walls.topWall=false;
      this.grid[row-1][cell].walls.bottomWall = false;
    }
    else if(this.grid[row][cell].walls.leftWall==true){
      this.grid[row][cell].walls.leftWall=false;
      this.grid[row][cell-1].walls.rightWall=false;
    }
    else if (this.grid[row][cell].walls.bottomWall==true){
      this.grid[row][cell].walls.bottomWall=false;
      this.grid[row+1][cell].walls.topWall=false;
    }

    row=Math.floor(Math.random()*10+1);
    count++;
    cell= Math.floor(Math.random()*10+1);
    }
    // Loop through the 2d grid array and call the show method for each cell instance
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].set_position();
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }
    // This function will assign the variable 'next' to random cell out of the current cells available neighbouting cells

  }

  make_maze(){
    let next = current.checkNeighbours();
    // If there is a non visited neighbour cell
    if (next) {
      next.visited = true;
      // Add the current cell to the stack for backtracking
      this.stack.push(current);
      // This function compares the current cell to the next cell and removes the relevant walls for each cell
      current.removeWalls(current, next);
      // Set the next cell to the current cell
      current = next;
      this.make_maze();

      // Else if there are no available neighbours start backtracking using the stack
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      this.make_maze();
    }
    // If no more items in the stack then all cells have been visted and the function can be exited
    if (this.stack.length === 0) {
      generationComplete = true;
      return;
    }
  }
}

class Cell {
  // Constructor takes in the rowNum and colNum which will be used as coordinates to draw on the canvas.
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false; // constructing maze using DFS
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
    // parentGrid is passed in to enable the checkneighbours method.
    // parentSize is passed in to set the size of each cell on the grid
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
    this.positionX;
    this.positionY;
  }

  set_position(){
    this.positionX = this.colNum*this.parentSize/this.parentGrid.length;
    this.positionY = this.rowNum*this.parentSize/this.parentGrid.length;
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    // The following lines push all available neighbours to the neighbours array
    // undefined is returned where the index is out of bounds (edge cases)
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    // if the following are not 'undefined' then push them to the neighbours array
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    // Choose a random neighbour from the neighbours array
    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor
  drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }


  removeWalls(cell1, cell2) {
    // compares to two cells on x axis
    let x = cell1.colNum - cell2.colNum;
    // Removes the relevant walls if there is a different on x axis
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x === -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }
    // compares to two cells on x axis
    let y = cell1.rowNum - cell2.rowNum;
    // Removes the relevant walls if there is a different on x axis
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  // Draws each of the cells on the maze canvas
  show(size, rows, columns) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;
    // console.log(`x =${x}`);
    // console.log(`y =${y}`);
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "black";
    ctx.lineWidth = 4;
    if (this.walls.topWall) {
      this.drawTopWall(x, y, size, columns, rows);
    }
    if (this.walls.rightWall) {
      this.drawRightWall(x, y, size, columns, rows);
    }
    if (this.walls.bottomWall) {
      this.drawBottomWall(x, y, size, columns, rows);
    }
    if (this.walls.leftWall) {
      this.drawLeftWall(x, y, size, columns, rows);
    }
  }

}


let mezze = new Maze(600, 13, 13); //169 cell maze created for Pac-Man game
mezze.setup();
mezze.draw();
