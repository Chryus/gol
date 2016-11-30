$ ->
  class Game
    constructor: () ->
      @width = $('canvas').attr('width')
      @height = $('canvas').attr('height')
      @canvas = document.getElementById('canvas')
      @ctx = canvas.getContext('2d')
      @cols = @width/10
      @rows = @height/10
      @colWidth = 10
      @rowHeight = 10
      @world = new World(@cols, @rows)
      @world.randomly_populate()
      @cell_grid = @world.cell_grid
      @cells = @world.cells
      @drawBoard()
      @revolutions = 0
      @nIntervId = null
      @setEvents()

    setEvents: () =>
      $('.start, .stop').on 'click', @toggleLife

    toggleLife: () ->
      value = $(this).html()
      if value == 'Start' and $(this).is(':visible')
        callBack = () ->
          game.tick()
        nIntervId = setInterval(callBack, 150)
        game.nIntervId = nIntervId
        $('.stop').fadeIn(600)
      else if value == 'Stop' and $(this).is(':visible')
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

  class World
    constructor: (cols, rows) ->
      @cols = cols
      @rows = rows
      @cells = []
      @cell_grid = []
      
      i = 0
      j = 0
      while i < rows
        rowArray = []
        while j < cols
          cell = new Cell(false, j, i)
          @cells.push(cell)
          rowArray.push(cell)
          j++
        @cell_grid.push(rowArray)
        j = 0
        i++

    liveNeighbors: (cell) =>
      liveNeighbors = []
      #north
      if cell.y > 0
        north = @cell_grid[cell.y - 1][cell.x]
        liveNeighbors.push(north) if north.alive
      #northeast
      if cell.y > 0 && cell.x < @cols - 1
        northeast = @cell_grid[cell.y - 1][cell.x + 1]
        liveNeighbors.push(northeast) if northeast.alive
      #east
      if cell.x < @cols - 1
        east = @cell_grid[cell.y][cell.x + 1]
        liveNeighbors.push(east) if east.alive
      #southeast
      if cell.y < @rows - 1 && cell.x < @cols - 1
        southeast = @cell_grid[cell.y + 1][cell.x + 1]
        liveNeighbors.push(southeast) if southeast.alive
      #south
      if cell.y < @rows - 1
        south = @cell_grid[cell.y + 1][cell.x]
        liveNeighbors.push(south) if south.alive
      #southwest
      if cell.x > 0 && cell.y < @rows - 1
        southwest = @cell_grid[cell.y + 1][cell.x - 1]
        liveNeighbors.push(southwest) if southwest.alive
      #west
      if cell.x > 0
        west = @cell_grid[cell.y][cell.x - 1]
        liveNeighbors.push(west) if west.alive
      #northwest
      if cell.x > 0 && cell.y > 0
        northwest = @cell_grid[cell.y - 1][cell.x - 1]
        liveNeighbors.push(northwest) if northwest.alive
      liveNeighbors

    liveCells: () =>
      @cells.filter( (cell) ->
        return cell.alive == true
      )

    randomly_populate: () =>
      @cells.forEach (cell) ->
        cell.alive = !!Math.floor(Math.random() * 2)

  class Cell
    constructor: (alive, x, y) ->
      @alive = alive
      @x = x
      @y = y

    die: ->
      alive = false

    revive: ->
      alive = true

    alive: ->
      alive

    dead: ->
      !alive

  game = new Game