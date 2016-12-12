$(function() {
  class Cell {
    constructor(alive, x, y) {
      this.alive = alive;
      this.x = x;
      this.y = y;
    }

    die () { this.alive = false; }

    revive () { this.alive = true; }

    isAlive () { return this.alive; }

    dead () { return !this.alive; }
  }
  App['Cell'] = Cell;
});