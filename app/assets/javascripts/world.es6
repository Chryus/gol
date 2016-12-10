$(function() {
  class World {

    constructor (cols, rows) {
      this.cols = cols;
      this.rows = rows;
      this.cells = [];
      this.cellGrid = [];
      this.makeGrid();
      this.operators = {
        '+': function(a, b) { return a + b; }, 
        '-': function(a, b) { return a - b; }
      }
    }

    makeGrid () {
      let i = 0;
      while (i < this.rows) {
        let rowArray = [];
        let j = 0;
        while (j < this.cols) {
          let cell = new App.Cell(false, j, i);
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

    calcPattern (name, startPoint) {
      let xMidpoint = this.cols/2;
      let yMidpoint = this.rows/2;
      let XYOffset = [0, 0];
      let cells = [];
      let cell = this.cellGrid[startPoint[1]][startPoint[0]];
      let xOp = this.operators[cell.x < xMidpoint ? '+' : '-'];
      let yOp = this.operators[cell.y < yMidpoint ? '+' : '-'];
      switch (name) {
        case "cell":
          cells.push(cell);
          break;
        case "glider":
          if (cell.x > 1 && cell.x < this.cols-2 && cell.y > 1 && cell.y < this.rows-2) {
            XYOffset = [7, 6];
            cells.push.apply(cells,
              [cell, this.cellGrid[yOp(cell.y, 2)][cell.x], // north 1 
              this.cellGrid[yOp(cell.y, 1)][cell.x], // north 
              this.cellGrid[cell.y][xOp(cell.x, 1)], // west
              this.cellGrid[yOp(cell.y, 1)][xOp(cell.x, 2)]]); // north 1 west 2
          }
          break;
        case "lightweight":
          if (cell.x > 3 && cell.y > 2) {
            XYOffset = [9, 8];
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
          if (cell.x > 5 && cell.y > 3 && cell.y < this.rows-1) {
            XYOffset = [13, 10];
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
          console.log("Boop.");
      }
      return { cells: cells, XYOffset: XYOffset };
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
  App['World'] = World;
});

