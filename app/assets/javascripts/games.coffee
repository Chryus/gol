# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  class Game
    constructor: (gameData) ->
      @canvas = document.getElementById('canvas')
      @ctx = canvas.getContext('2d')
      @cols = gameData.cols
      @rows = gameData.rows
      @colWidth = gameData.col_width
      @rowHeight = gameData.row_height
      @cells = gameData.cells
      @cell_grid = gameData.cell_grid
      @n = 0
        
      @drawBoard = () ->
        @cell_grid.forEach (row) =>
          row.forEach (cell) =>
            if cell.alive == true
              @ctx.fillStyle = '#0ff'
            else
              @ctx.fillStyle = '#fa00ff'
            @ctx.fillRect(cell.x * @colWidth, cell.y * @rowHeight, @colWidth - 1, @rowHeight - 1);
        @tick()

      @liveNeighbors = (cell) ->
        liveNeighbors = []
        #north
        if cell.y > 0
          north = @cell_grid[cell.y - 1][cell.x]
          liveNeighbors.push(north) if north.alive?
        #northeast
        if cell.y > 0 && cell.x < @cols - 1
          northeast = @cell_grid[cell.y - 1][cell.x + 1]
          liveNeighbors.push(northeast) if northeast.alive?
        #east
        if cell.x < @cols - 1
          east = @cell_grid[cell.y][cell.x + 1]
          liveNeighbors.push(east) if east.alive?
        #southeast
        if cell.y < @rows - 1 && cell.x < @cols - 1
          southeast = @cell_grid[cell.y + 1][cell.x + 1]
          liveNeighbors.push(southeast) if southeast.alive?
        #south
        if cell.y < @rows - 1
          south = @cell_grid[cell.y + 1][cell.x]
          liveNeighbors.push(south) if south.alive?
        #southwest
        if cell.x > 0 && cell.y < @rows - 1 
          southwest = @cell_grid[cell.y + 1][cell.x - 1]
          liveNeighbors.push(southwest) if southwest.alive?
        #west
        if cell.x > 0
          west = @cell_grid[cell.y][cell.x - 1]
          liveNeighbors.push(west) if west.alive?
        #northwest
        if cell.x > 0 && cell.y > 0
          northwest = @cell_grid[cell.y - 1][cell.x - 1]
          liveNeighbors.push(northwest) if northwest.alive?
        liveNeighbors
      
      @tick = () ->
        liveCellsNextRound = []
        deadCellsNextRound = []
        @cell_grid.forEach (row) =>
          row.forEach (cell) =>
            neighbors = @liveNeighbors(cell).length
            if cell.alive == true # rules 1, 2 & 3
              if neighbors >= 2 && neighbors <= 3
                liveCellsNextRound.push(cell)
              else
                deadCellsNextRound.push(cell)
            else if neighbors == 3 # rule 4
              liveCellsNextRound.push(cell)
            else
              deadCellsNextRound.push(cell)
        liveCellsNextRound.forEach (cell) ->
          cell.alive = true
        deadCellsNextRound.forEach (cell) ->
          cell.alive = false
        @n++
        @drawBoard()

  $.get '/life.json', (data) ->   
    game = new Game(data)
    game.drawBoard()