$(function() {
  class Game {
    constructor () {
      this.canvas = document.getElementById('canvas');
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = canvas.getContext('2d');
      this.colWidth = 10;
      this.rowHeight = 10;
      this.cols = this.width/this.colWidth;
      this.rows = this.height/this.rowHeight;
      this.world = new App.World(this.cols, this.rows);
      this.drawBoard();
      this.callback;
      this.callbacks = {'tick': this.callBack = () => game.tick()};
      this.velocitySlider = $("#ex4").slider({ reversed : true});
      this.revolutions = 0;
      this.started = false;
      this.delay = 150;
      this.enableDraw = false;
      this.enablePattern = false;
      this.pattern = null;
      this.timer = null;
      this.setEvents();
    }

    setEvents () {
      $('.start, .stop').on('click', this.handleGameToggle);
      $('.randomize').on('click', this.handleRandomize);
      $('.clear').on('click', this.handleClear);
      $('input').on('click', this.handlePatternSelect);
      $('canvas').on('click', this.drawPattern);
      $('canvas').on('mousemove', this.reanimateCell);
      $('canvas').mousedown(function () { game.enableDraw = true; });
      $('canvas').mouseup(function () { game.enableDraw = false; });
      this.velocitySlider.on('change', this.calcInterval);
    }

    handlePatternSelect () {
      game.pattern = $("input[type=radio]:checked").parent().text().trim();
      game.enablePattern = true;
    }

    drawPattern () {
      if (game.enablePattern === false) { return };
      if (game.pattern == "Glider") {
        let patternCells = [];
        let coords = game.getCoords();
        let cell = game.world.cellGrid[coords[1]][coords[0]];
        patternCells.push.apply(patternCells,
          [cell, game.world.cellGrid[cell.y-2][cell.x], // north 1 
          game.world.cellGrid[cell.y-1][cell.x], // north 
          game.world.cellGrid[cell.y][cell.x-1], // west
          game.world.cellGrid[cell.y-1][cell.x-2]]); // north 1 west 2
        patternCells.forEach( (cell) => {
          cell.revive();
          game.drawCell(cell);
        });
      }
    }

    handleClear () {
      game.world.killAll();
      game.drawBoard();
    }

    handleRandomize () {
      game.world.randomlyPopulate()
      game.drawBoard()
    }

    reanimateCell () {
      if (game.enableDraw === true) {
        let coords = game.getCoords();
        console.log(coords);
        let cell = game.world.cellGrid[coords[1]][coords[0]];
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
      if (value === 'Start' && isVisible) {
        game.started = true;
        game.calcInterval();
        $('.stop').fadeIn(600);
      } else if (value === 'Stop' && isVisible) {
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
      this.world.cells.forEach( (cell) => {
        let neighbors = this.world.liveNeighbors(cell).length;
        let square = (x) => x * x
        if (cell.isAlive() === true) {// rules 1, 2 & 3
          if (neighbors === 2 || neighbors === 3) {
            liveCellsNextRound.push(cell);
          } else {
            deadCellsNextRound.push(cell);
          }
        } else if (neighbors === 3) { // rule 4
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
      this.world.cells.forEach ( (cell) =>  {
        this.drawCell(cell);
      });
    }

    drawCell (cell) {
      this.ctx.fillStyle = cell.isAlive() ? '#0ff' : '#fa00ff';
      this.ctx.fillRect(cell.x * this.colWidth, 
        cell.y * this.rowHeight, 
        this.colWidth - 1, 
        this.rowHeight - 1
      );
    }
  }
  App['Game'] = Game;
  let game = new Game();
})