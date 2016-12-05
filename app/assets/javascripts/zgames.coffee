$ ->
  class Game
    constructor: () ->
      @canvas = document.getElementById('canvas')
      @ctx = @canvas.getContext('2d')
      @width = @canvas.width
      @height = @canvas.height
      @ctx = @canvas.getContext('2d')
      @colWidth = 10
      @rowHeight = 10
      @cols = @width/@colWidth
      @rows = @height/@rowHeight
      @world = new App.World(@cols, @rows)
      @cellGrid = @world.cellGrid
      @cells = @world.cells
      @drawBoard()
      @callbacks = {'tick': callBack = () -> game.tick()}
      @velocitySlider = $("#ex4").slider({ reversed : true});
      @revolutions = 0
      @started = false
      @delay = 150
      @enableDraw = false
      @timer = null
      @setEvents()

    setEvents: () =>
      $('.start, .stop').on 'click', @handleGameToggle
      $('.randomize').on 'click', @handleRandomize
      #$('.glider').on 'click', @handleGlider
      $('.clear').on 'click', @handleClear
      $('canvas').on 'mousemove', @reanimateCell
      $('canvas').mousedown ->
        game.enableDraw = true
      $('canvas').mouseup ->
        game.enableDraw = false
      @velocitySlider.on 'change', @calcInterval

    handleGlider: () =>

    handleClear: () =>
      @world.killAllCells()
      @drawBoard()

    handleRandomize: () =>
      @world.randomlyPopulate()
      @drawBoard()

    calcInterval: () =>
      clearInterval(@timer)
      maxValue = @velocitySlider.data().sliderMax
      @delay = Math.abs(@velocitySlider.val() - maxValue) * 10
      if @started then @startTimer()

    startTimer: () =>
      @timer = setInterval(@callbacks['tick'], @delay)

    reanimateCell: () =>
      console.log("DRAWFLAG " + @enableDraw)
      if @enableDraw == true 
        coords = @getCursorCoords()
        console.log(coords)
        cell = @cellGrid[coords[1]][coords[0]]
        cell.revive()
        @drawCell(cell)

    getCursorCoords: () =>
      rect = @canvas.getBoundingClientRect()
      console.log(rect)
      x = @normalizeCoord(event.clientX - rect.left)
      y = @normalizeCoord(event.clientY - rect.top)
      console.log("x: " + x + " y: " + y)
      return [x, y]

    normalizeCoord: (coord) ->
      if coord < 10 then 0 else Math.floor(coord/10)

    handleGameToggle: () ->
      value = $(this).html()
      isVisible = $(this).is(':visible')
      if value == 'Start' and isVisible
        game.started = true
        game.calcInterval()
        $('.stop').fadeIn(600)
      else if value == 'Stop' and isVisible
        game.started = false
        clearInterval(game.timer)
        $('.start').fadeIn(600)
      $(this).hide()
      return

    drawBoard: () =>
      @cells.forEach (cell) =>
        @drawCell(cell)

    drawCell: (cell) =>
      @ctx.fillStyle = if cell.alive then '#0ff' else '#fa00ff'
      @ctx.fillRect(cell.x * @colWidth, cell.y * @rowHeight, @colWidth - 1, @rowHeight - 1)

    tick: () =>
      liveCellsNextRound = []
      deadCellsNextRound = []
      @cells.forEach (cell) =>
        neighbors = @world.liveNeighbors(cell).length
        if cell.alive == true # rules 1, 2 & 3
          if neighbors == 2 || neighbors == 3
            liveCellsNextRound.push(cell)
          else
            deadCellsNextRound.push(cell)
        else if neighbors == 3 # rule 4
          liveCellsNextRound.push(cell)
      liveCellsNextRound.forEach (cell) ->
        cell.alive = true
      deadCellsNextRound.forEach (cell) ->
        cell.alive = false
      @revolutions++
      $("#revolutions").html(@revolutions)
      @drawBoard()
      
  game = new Game