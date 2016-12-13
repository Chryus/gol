import Cell from './Cell.es6';

class World {
  constructor (cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.xMidpoint = cols/2;
    this.yMidpoint = rows/2;
    this.cells = [];
    this.cellGrid = [];
    this.makeGrid();
    this.operators = {
      '+': function(a, b) { return a + b; }, 
      '-': function(a, b) { return a - b; }
    }
    this.pattern = "cell";
  }

  makeGrid () {
    let i = 0;
    while (i < this.rows) {
      let rowArray = [];
      let j = 0;
      while (j < this.cols) {
        let cell = new Cell(false, j, i);
        this.cells.push(cell);
        rowArray.push(cell);
        j++;
      }
      this.cellGrid.push(rowArray);
      i++
    }
  }

  liveNeighbors (cell) {
    let liveNeighbors = [];
    //north
    if (cell.y > 0) {
      let north = this.cellGrid[cell.y - 1][cell.x];
      if (north.isAlive()) liveNeighbors.push(north);
    }
    //northeast
    if (cell.y > 0 && cell.x < this.cols - 1) {
      let northeast = this.cellGrid[cell.y - 1][cell.x + 1];
      if (northeast.isAlive()) liveNeighbors.push(northeast);
    }
    //east
    if (cell.x < this.cols - 1) {
      let east = this.cellGrid[cell.y][cell.x + 1];
      if (east.isAlive()) liveNeighbors.push(east);
    }
    //southeast
    if (cell.y < this.rows - 1 && cell.x < this.cols - 1) {
      let southeast = this.cellGrid[cell.y + 1][cell.x + 1];
      if (southeast.isAlive()) liveNeighbors.push(southeast);
    }
    //south
    if (cell.y < this.rows - 1) {
      let south = this.cellGrid[cell.y + 1][cell.x];
      if (south.isAlive()) liveNeighbors.push(south);
    }
    //southwest
    if (cell.x > 0 && cell.y < this.rows - 1) {
      let southwest = this.cellGrid[cell.y + 1][cell.x - 1];
      if (southwest.isAlive()) liveNeighbors.push(southwest);
    }
    //west
    if (cell.x > 0) {
      let west = this.cellGrid[cell.y][cell.x - 1];
      if (west.isAlive()) liveNeighbors.push(west);
    }
    //northwest
    if (cell.x > 0 && cell.y > 0) {
      let northwest = this.cellGrid[cell.y - 1][cell.x - 1];
      if (northwest.isAlive()) liveNeighbors.push(northwest);
    }
    return liveNeighbors;
  }

  withinYMidRange (yCoord, spaceshipHeight) {
    let min = this.yMidpoint - spaceshipHeight
    let max = this.yMidpoint + spaceshipHeight
    return yCoord >= min && yCoord <= max;
  }

  addXCushion(startPoint, direction) {
    return (direction === 'easterly' && startPoint[0] >= this.xMidpoint) ||
      (direction === 'westerly' && startPoint[0] <= this.xMidpoint)
  }

  getXYOffset (startPoint, direction) {
    let XYOffset = [0, 0];
    let addXCushion = this.addXCushion(startPoint, direction)
    switch (this.pattern) {
      case "glider":
        XYOffset = [5, 5];
        if (addXCushion) {
          XYOffset[0] += XYOffset[0];
        }
        break;
      case "lightweight":
        XYOffset = [7, 7];          
        if (addXCushion){
          XYOffset[0] += XYOffset[0];
        }  
        break;
      case "heavyweight":
        XYOffset = [9, 8];
        if (addXCushion){
          XYOffset[0] += XYOffset[0];
        }
        break;
      default:
        XYOffset;
    }
    if (this.withinYMidRange(startPoint[1], XYOffset[1])) {
      XYOffset[1] += XYOffset[1];
    }
    return XYOffset;
  }

  calcPattern (startPoint) {
    let cells = [];
    let cell = this.cellGrid[startPoint[1]][startPoint[0]];
    let xOp = this.operators[cell.x < this.xMidpoint ? '+' : '-'];
    let yOp = this.operators[cell.y < this.yMidpoint ? '+' : '-'];
    switch (this.pattern) {
      case "glider":
        if (cell.x > 1 && cell.x < this.cols-2 && cell.y > 1 && cell.y < this.rows-2) {
          cells.push.apply(cells,
            [cell, this.cellGrid[yOp(cell.y, 2)][cell.x], // north 1 
            this.cellGrid[yOp(cell.y, 1)][cell.x], // north 
            this.cellGrid[cell.y][xOp(cell.x, 1)], // west
            this.cellGrid[yOp(cell.y, 1)][xOp(cell.x, 2)]]); // north 1 west 2
        }
        break;
      case "lightweight":
        if (cell.x > 3 && cell.y > 2) {
          cells.push.apply(cells,
              [cell, this.cellGrid[yOp(cell.y, 2)][cell.x],
              this.cellGrid[yOp(cell.y, 1)][cell.x],
              this.cellGrid[cell.y][xOp(cell.x, 1)],
              this.cellGrid[cell.y][xOp(cell.x, 2)],
              this.cellGrid[cell.y][xOp(cell.x, 3)],
              this.cellGrid[yOp(cell.y, 1)][xOp(cell.x, 4)],
              this.cellGrid[yOp(cell.y, 3)][xOp(cell.x, 4)],
              this.cellGrid[yOp(cell.y, 3)][xOp(cell.x, 1)]]);
        }
        break;
      case "heavyweight":
        if (cell.x > 3 && cell.y > 3 && cell.y < this.rows-1) {
          cells.push.apply(cells,
              [cell, this.cellGrid[cell.y][xOp(cell.x, 1)],
              this.cellGrid[cell.y][xOp(cell.x, 2)],
              this.cellGrid[cell.y][xOp(cell.x, 3)],
              this.cellGrid[cell.y][xOp(cell.x, 4)],
              this.cellGrid[cell.y][xOp(cell.x, 5)],
              this.cellGrid[yOp(cell.y, 1)][xOp(cell.x, 6)],
              this.cellGrid[yOp(cell.y, 3)][xOp(cell.x, 6)],                
              this.cellGrid[yOp(cell.y, 4)][xOp(cell.x, 4)],
              this.cellGrid[yOp(cell.y, 4)][xOp(cell.x, 3)],
              this.cellGrid[yOp(cell.y, 3)][xOp(cell.x, 1)],
              this.cellGrid[yOp(cell.y, 2)][cell.x],
              this.cellGrid[yOp(cell.y, 1)][cell.x]]);
        }
        break;
      default: 
        cells.push(cell);
    }
    return cells;
  }

  liveCells() {
    return this.cells.filter(cell => cell.alive === true);
  }

  killAll () {
    this.cells.forEach(cell => { cell.die() });
  }

  randomlyPopulate () {
    this.cells.forEach(cell => {
      cell.alive = !!Math.floor(Math.random() * 2);
    })
  }
}

export default World;

