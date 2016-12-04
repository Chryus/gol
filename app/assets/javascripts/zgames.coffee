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
      @world.randomlyPopulate()
      @drawBoard()
      @revolutions = 0
      @drawTimer = null
      @enableDraw = false
      @enableHandler = false
      @tickNntervId = null
      @cellSelectNtervId
      @setEvents()

    setEvents: () =>
      $('.start, .stop').on 'click', @toggleGame
      $('canvas').on 'mousemove', @toggleCellLife
      $('canvas').mousedown ->
        game.enableDraw = true
      $('canvas').mouseup ->
        game.enableDraw = false

    toggleCellLife: () =>
      console.log("DRAWFLAG " + @enableDraw)
      if @enableDraw == true 
        coords = @getCursorCoords()
        console.log(coords)
        cell = @cellGrid[coords[1]][coords[0]]
        cell.revive()
        #if cell.dead() then cell.revive() else cell.die()
        @drawCell(cell)

    getCursorCoords: () =>
      rect = @canvas.getBoundingClientRect()
      x = @normalizeCoord(event.clientX - rect.left)
      y = @normalizeCoord(event.clientY - rect.top)
      console.log("x: " + x + " y: " + y)
      return [x, y]

    normalizeCoord: (coord) ->
      if coord < 10 then 0 else Math.floor(coord/10)

    toggleGame: () ->
      value = $(this).html()
      isVisible = $(this).is(':visible')
      if value == 'Start' and isVisible
        callBack = () ->
          game.tick()
        tickNntervId = setInterval(callBack, 150)
        game.tickNntervId = tickNntervId
        $('.stop').fadeIn(600)
      else if value == 'Stop' and isVisible
        clearInterval(game.nIntervId)
        $('.start').fadeIn(600)
      $(this).hide()
      return

    drawBoard: () =>
      @cells.forEach (cell) =>
        @ctx.fillStyle = if cell.alive then '#0ff' else '#fa00ff'
        @ctx.fillRect(cell.x * @colWidth, cell.y * @rowHeight, @colWidth - 1, @rowHeight - 1)

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