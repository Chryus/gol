$(function() {
  class Cell {
    constructor(alive, x, y) {
      this.alive = alive
      this.x = x
      this.y = y
    }

    die () {
      this.alive = false;
    }

    revive () {
      this.alive = true
    }

    alive () {
      this.alive
    }

    dead () {
      this.alive
    }
  }
  App['Cell'] = Cell
});