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
      this.pattern = $("input[type=radio]:checked").val();
      this.enablePatternOffset = false;
      this.previousStartPoint = [null, null];
      this.patternOffset = [0, 0];   
      this.timer = null;
      this.setEvents();
    }

    setEvents () {
      $(window).on('load', this.handleResize);
      $(window).on('resize', this.handleResize);
      $('.start, .stop').on('click', this.handleGameToggle);
      $('.randomize').on('click', this.handleRandomize);
      $('.clear').on('click', this.handleClear);
      $('input').on('click', this.handlePatternSelect);
      $('canvas').on('mousedown', { val: true }, this.setFlags);
      $('canvas').on('mouseup', { val: false }, this.setFlags);
      $('canvas').on('mousemove', this.drawPattern);
      $('canvas').on('click', this.handleClick);
      this.velocitySlider.on('change', this.calcInterval);
    }

    handleClick () {
      game.enableDraw = true;
      game.drawPattern()
      game.enableDraw = false;
    }

    setFlags (event) {
      game.enableDraw = event.data.val;
      game.enablePatternOffset = event.data.val;
    }

    handleResize () {
      clearInterval(game.timer);
      if (game.started == true) { $('.stop').click() };
      game.resize();
      game = new Game();
    }

    resize () {
      let heightOffset = 200;
      let controlsWidth = $('.controls').css("width").match(/\d+/g)[0];
      let rightMargin = $('.controls').css("margin-right").match(/\d+/g)[0];
      let widthOffset = parseInt(controlsWidth) + parseInt(rightMargin) + 50;
      canvas.width = game.roundDownToCol(window.innerWidth - widthOffset);
      canvas.height = game.roundDownToCol(window.innerHeight - heightOffset);
    }

    roundDownToCol(num) {
      return Math.floor((num + 1)/game.colWidth)*game.colWidth;
    }

    handlePatternSelect () {
      let name = $("input[type=radio]:checked").val();
      game.pattern = name;
    }

    calcPattern () {
      let midpoint = game.cols/2;
      let patternCells = [];
      let coords = game.getCoords();
      let cell = game.world.cellGrid[coords[1]][coords[0]];
      console.log(game.pattern);
      switch (game.pattern) {
        case "cell":
          game.patternOffset = [0,0];
          patternCells.push(cell);
          break;
        case "glider":
          game.patternOffset = [5,5];
          if (cell.x > 1 && cell.x < game.cols-2 && 
            cell.y > 1 && cell.y < game.rows-2) {
            patternCells.push.apply(patternCells,
              [cell, game.world.cellGrid[cell.y-2][cell.x], // north 1 
              game.world.cellGrid[cell.y-1][cell.x], // north 
              game.world.cellGrid[cell.y][cell.x-1], // west
              game.world.cellGrid[cell.y-1][cell.x-2]]); // north 1 west 2
          }
          break;
        case "lightweight":
          game.patternOffset = [5,6];
          if (cell.x > 3 && cell.y > 2) {
            patternCells.push.apply(patternCells,
                [cell, game.world.cellGrid[cell.y-2][cell.x],
                game.world.cellGrid[cell.y-1][cell.x],
                game.world.cellGrid[cell.y][cell.x-1],
                game.world.cellGrid[cell.y][cell.x-2],
                game.world.cellGrid[cell.y][cell.x-3],
                game.world.cellGrid[cell.y-1][cell.x-4],
                game.world.cellGrid[cell.y-3][cell.x-4],
                game.world.cellGrid[cell.y-3][cell.x-1]]);
          }
          break;
        case "heavyweight":
          game.patternOffset = [9,7];
          if (cell.x > 5 && cell.y > 3 && cell.y < game.rows-1) {
            patternCells.push.apply(patternCells,
                [cell, game.world.cellGrid[cell.y][cell.x-1],
                game.world.cellGrid[cell.y][cell.x-2],
                game.world.cellGrid[cell.y][cell.x-3],
                game.world.cellGrid[cell.y][cell.x-4],
                game.world.cellGrid[cell.y][cell.x-5],
                game.world.cellGrid[cell.y-1][cell.x-6],
                game.world.cellGrid[cell.y-3][cell.x-6],                
                game.world.cellGrid[cell.y-4][cell.x-4],
                game.world.cellGrid[cell.y-4][cell.x-3],
                game.world.cellGrid[cell.y-3][cell.x-1],
                game.world.cellGrid[cell.y-2][cell.x],
                game.world.cellGrid[cell.y-1][cell.x]]);
          }
          break;
        default: 
          console.log("This can't happen unless the dom is infected with space virus.");
      }
      return patternCells;
    }

    drawPattern () {
      if (game.enableDraw === false) { return; }
      
      let patternArray = game.calcPattern();
      let currentStartPoint = [patternArray[0].x, patternArray[0].y];
      let xDiff = Math.abs(currentStartPoint[0] - game.previousStartPoint[0]);
      let yDiff = Math.abs(currentStartPoint[1] - game.previousStartPoint[1]);

      if (xDiff >= game.patternOffset[0] || yDiff >= game.patternOffset[1]) { 
        game.previousStartPoint = [patternArray[0].x, patternArray[0].y];
        patternArray.forEach( (cell) => {
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
      game.delay = Math.abs(game.velocitySlider.val() - maxValue) * 5;
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