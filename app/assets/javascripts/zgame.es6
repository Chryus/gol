$(function() {
  class Game {
    constructor () {
      this.canvas = document.getElementById('canvas');
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = canvas.getContext('2d')
      this.colWidth = 10;
      this.rowHeight = 10;
      this.cols = this.width/this.colWidth;
      this.rows = this.height/this.rowHeight;
      this.world = new App.World(this.cols, this.rows);
      this.cellGrid = this.world.cellGrid;
      this.cells = this.world.cells;
      this.drawBoard();
      this.callback;
      this.callbacks = {'tick': this.callBack = () => game.tick()}
      this.velocitySlider = $("#ex4").slider({ reversed : true});
      this.revolutions = 0;
      this.started = false;
      this.delay = 150;
      this.enableDraw = false;
      this.timer = null;
      this.setEvents();
    }

    setEvents () {
      $('.start, .stop').on('click', this.handleGameToggle);
      $('.randomize').on('click', this.handleRandomize);
      $('.clear').on('click', this.handleClear);
      $('.glider').on('click', this.handleGlider);
      $('canvas').on('mousemove', this.reanimateCell);
      $('canvas').mousedown(function () { game.enableDraw = true; });
      $('canvas').mouseup(function () { game.enableDraw = false; });
      this.velocitySlider.on('change', this.calcInterval);
    }

    handleGlider () {
      console.log("put glider on canvas");
    }

    handleClear () {
      game.world.killAllCells();
      game.drawBoard();
    }

    handleRandomize () {
      game.world.randomlyPopulate()
      game.drawBoard()
    }

    reanimateCell () {
      if (game.enableDraw == true) {
        let coords = game.getCoords();
        console.log(coords);
        let cell = game.cellGrid[coords[1]][coords[0]];
        cell.revive();
        game.drawCell(cell);
      }
    }

    getCoords () {
      let rect = this.canvas.getBoundingClientRect();
      let x = this.normalizeCoord(event.clientX - rect.left);
      let y = this.normalizeCoord(event.clientY - rect.top);
      console.log("x: " + x + " y: " + y);
      return [x, y];
    }

    normalizeCoord (coord) {
      return coord < 10 ? 0 : Math.floor(coord/10);
    }

    handleGameToggle () {
      let value = $(this).html()
      let isVisible = $(this).is(':visible')
      if (value == 'Start' && isVisible) {
        game.started = true;
        game.calcInterval();
        $('.stop').fadeIn(600);
      } else if (value == 'Stop' && isVisible) {
        game.started = false;
        clearInterval(game.timer);
        $('.start').fadeIn(600);
      } else { return; }
      $(this).hide()
      return
    }

    calcInterval () {
      clearInterval(game.timer);
      let maxValue = game.velocitySlider.data().sliderMax;
      game.delay = Math.abs(game.velocitySlider.val() - maxValue) * 10;
      if (game.started) game.startTickTimer();
    }

    startTickTimer () {
      this.timer = setInterval(this.callbacks['tick'], this.delay);
    }

    tick () {
      let liveCellsNextRound = [];
      let deadCellsNextRound = [];
      this.cells.forEach( (cell) => {
        let neighbors = this.world.liveNeighbors(cell).length;
        let square = (x) => x * x
        if (cell.alive == true) {// rules 1, 2 & 3
          if (neighbors == 2 || neighbors == 3) {
            liveCellsNextRound.push(cell);
          } else {
            deadCellsNextRound.push(cell);
          }
        } else if (neighbors == 3) { // rule 4
          liveCellsNextRound.push(cell);
        }
      })
      liveCellsNextRound.forEach ((cell) => { cell.alive = true });
      deadCellsNextRound.forEach ((cell) => { cell.alive = false });
      this.revolutions++;
      $("#revolutions").html(this.revolutions);
      this.drawBoard();
    }

    drawBoard () {
      this.cells.forEach ( (cell) =>  {
        this.drawCell(cell) 
      });
    }

    drawCell (cell) {
      this.ctx.fillStyle = cell.alive ? '#0ff' : '#fa00ff';
      this.ctx.fillRect(cell.x * this.colWidth, 
        cell.y * this.rowHeight, 
        this.colWidth - 1, 
        this.rowHeight - 1
      );
    }
  }
  let game = new Game()
})