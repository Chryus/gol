import World from './World.es6';
import Cell from './Cell.es6';
import GameHelper from './GameHelper.es6';

$(function() {
  class Game {
    constructor () {
      this.helper = new GameHelper();
      this.revolutions = 0;
      this.canvas = $('#canvas')[0];
      this.ctx = this.canvas.getContext('2d');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.colWidth = 10;
      this.rowHeight = 10;
      this.cols = this.width/this.colWidth;
      this.rows = this.height/this.rowHeight;
      this.world = new World(this.cols, this.rows);
      this.callback;
      this.callbacks = {'tick': this.callBack = () => game.tick()};
      this.velocitySlider = $("#ex4").slider({ reversed : true});
      this.started = false;
      this.tickDelay = 150;
      this.enableDraw = false;
      this.previousStartPoint = [0, 0];
      this.timer = null;
      this.world.randomlyPopulate();
      this.setEvents();
    }

    setEvents () {
      $(window).on('load', this.handleResize);
      $(window).on('resize', this.handleResize);
      $('.start, .stop').on('click', this.handleGameToggle);
      $('.randomize').on('click', this.handleRandomize);
      $('.clear').on('click', this.handleClear);
      $('input').on('click', this.handlePatternSelect);
      $('canvas').on('mousedown', this.handleMouseDown);
      $(window).on('mouseup', function () { game.enableDraw = false });
      $('canvas').on('mousemove', this.drawPattern);
      this.velocitySlider.on('change', this.calcInterval);
    }

    handleMouseDown () {
      game.enableDraw = true;
      game.drawPattern();
    }

    handleResize () {
      game.resize();
      game.drawBoard();
    }

    resize () {
      let heightOffset = 200;
      let controlsWidth = $('.controls').css("width").match(/\d+/g)[0];
      let rightMargin = $('.controls').css("margin-right").match(/\d+/g)[0];
      let widthOffset = parseInt(controlsWidth) + parseInt(rightMargin) + 50;
      canvas.width = game.helper.roundDownToTen(window.innerWidth - widthOffset);
      canvas.height = game.helper.roundDownToTen(window.innerHeight - heightOffset);
      game.cols = canvas.width/game.colWidth;
      game.rows = canvas.height/game.rowHeight;
      game.world.cols = game.cols;
      game.world.rows = game.rows;
      game.world.xMidpoint = game.world.cols/2
      game.world.yMidpoint = game.world.rows/2
    }


    handlePatternSelect () {
      let name = $("input[type=radio]:checked").val();
      game.world.pattern = name;
    }

    drawPattern () {
      if (game.enableDraw === false) { return; }

      let startPoint = game.getStartPoint();
      let xDiff = Math.abs(startPoint[0] - game.previousStartPoint[0]);
      let yDiff = Math.abs(startPoint[1] - game.previousStartPoint[1]);
      let direction = game.helper.getDirection(startPoint, game.previousStartPoint);

      let XYOffset = game.world.getXYOffset(startPoint, direction);
      
      if (xDiff >= XYOffset[0] || yDiff >= XYOffset[1]) { 
        game.previousStartPoint = startPoint;
        let cells = game.world.calcPattern(startPoint);
        cells.forEach( (cell) => {
          cell.revive();
          game.drawCell(cell);
        });
      }
    }

    handleClear () {
      clearInterval(game.timer);
      $('.start, .stop').click();
      game.world.killAll();
      game.drawBoard();
    }

    handleRandomize () {
      game.world.randomlyPopulate();
      game.drawBoard();
    }

    getStartPoint () {
      let rect = this.canvas.getBoundingClientRect();
      let x = this.helper.normalizeCoord(event.clientX - rect.left);
      let y = this.helper.normalizeCoord(event.clientY - rect.top);
      console.log("x: " + x + " y: " + y);
      return [x, y];
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
      game.tickDelay = Math.abs(game.velocitySlider.val() - maxValue) * 5;
      if (game.started) game.startTickTimer();
    }

    startTickTimer () {
      this.timer = setInterval(this.callbacks['tick'], this.tickDelay);
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
  let game = new Game();
});

export default Game;