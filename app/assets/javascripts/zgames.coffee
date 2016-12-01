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
      @nIntervId = null
      @setEvents()

    setEvents: () =>
      $('.start, .stop').on 'click', @toggleLife

    toggleLife: () ->
      value = $(this).html()
      isVisible = $(this).is(':visible')
      if value == 'Start' and isVisible
        callBack = () ->
          game.tick()
        nIntervId = setInterval(callBack, 150)
        game.nIntervId = nIntervId
        $('.stop').fadeIn(600)
      else if value == 'Stop' and isVisible
        clearInterval(game.nIntervId)
        $('.start').fadeIn(600)
      $(this).hide()
      return

    drawBoard: () =>
      @cells.forEach (cell) =>
        if cell.alive == true
          @ctx.fillStyle = '#0ff'
        else
          @ctx.fillStyle = '#fa00ff'
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