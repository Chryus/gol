$(function() {
  class World {
    constructor (cols, rows) {
      this.cols = cols;
      this.rows = rows;
      this.cells = [];
      this.cellGrid = [];
      this.makeGrid();
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
        if (north.alive) liveNeighbors.push(north);
      }
      //northeast
      if (cell.y > 0 && cell.x < this.cols - 1) {
        let northeast = this.cellGrid[cell.y - 1][cell.x + 1];
        if (northeast.alive) liveNeighbors.push(northeast);
      }
      //east
      if (cell.x < this.cols - 1) {
        let east = this.cellGrid[cell.y][cell.x + 1];
        if (east.alive) liveNeighbors.push(east);
      }
      //southeast
      if (cell.y < this.rows - 1 && cell.x < this.cols - 1) {
        let southeast = this.cellGrid[cell.y + 1][cell.x + 1];
        if (southeast.alive) liveNeighbors.push(southeast);
      }
      //south
      if (cell.y < this.rows - 1) {
        let south = this.cellGrid[cell.y + 1][cell.x];
        if (south.alive) liveNeighbors.push(south);
      }
      //southwest
      if (cell.x > 0 && cell.y < this.rows - 1) {
        let southwest = this.cellGrid[cell.y + 1][cell.x - 1];
        if (southwest.alive) liveNeighbors.push(southwest);
      }
      //west
      if (cell.x > 0) {
        let west = this.cellGrid[cell.y][cell.x - 1];
        if (west.alive) liveNeighbors.push(west);
      }
      //northwest
      if (cell.x > 0 && cell.y > 0) {
        let northwest = this.cellGrid[cell.y - 1][cell.x - 1];
        if (northwest.alive) liveNeighbors.push(northwest);
      }
      return liveNeighbors;
    }

    killAllCells () {
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

