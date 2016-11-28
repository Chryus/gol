# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext('2d')

  drawBoard = ->
    $.get '/life.json', (data) ->
      data.cells.forEach (cell) ->
        if cell.alive == true
          ctx.fillStyle = "#0ff"
        else
          ctx.fillStyle = "#fa00ff"
        ctx.fillRect(cell.x*data.col_width, cell.y * data.row_height, data.col_width-1, data.row_height-1);
      #tick(data)

  # tick = (data) ->
  #   cols = data.cols
  #   rows = data.rows
  #   cells = data.cells
  #   live_cells_next_round = []
  #   dead_cells_next_round = []
  #   cells.forEach (cell) ->
  #     if cell.alive? # rules 1, 2 & 3
  #       if live_neighbors(cell, cells, cols, rows).length >= 2 || live_neighbors(cell, cells, cols, rows).length <= 3
  #         live_cells_next_round.push(cell)
  #       else
  #         dead_cells_next_round.push(cell)
  #     else if live_neighbors(cell).length == 3 # rule 4
  #       live_cells_next_round.push(cell)
  #   live_cells_next_round.forEach (cell) ->
  #    cell.alive = true
  #   dead_cells_next_round.forEach (cell) ->
  #    cell.alive = false
  #   return live_cells_next_round.concat(dead_cells_next_round)
  
  # live_neighbors = (cell, cells, cols, rows) ->
  #   live_neighbors = []
  #   #north
  #   if cell.y > 0
  #     north = neighbor(cells, cell.y-1, cell.x)
  #     live_neighbors.push(north) if north.alive?
  #   #northeast
  #   if cell.y > 0 && cell.x < cols - 1
  #     northeast = neighbor(cells, cell.y-1, cell.x+1)
  #     live_neighbors.push(northeast) if northeast.alive?
  #   #east
  #   if cell.x < cols - 1
  #     east = neighbor(cells, cell.y, cell.x+1)
  #     live_neighbors.push(east) if east.alive?
  #   #southeast
  #   if cell.y < rows - 1 && cell.x < cols - 1
  #     southeast = neighbor(cells, cell.y+1, cell.x+1)
  #     live_neighbors.push(southeast) if southeast.alive?
  #   #south
  #   if cell.y < rows - 1
  #     south = neighbor(cells, cell.y+1, cell.x)
  #     live_neighbors.push(south) if south.alive?
  #   #southwest
  #   if cell.x > 0 && cell.y < rows - 1 
  #     southwest = neighbor(cells, cell.y+1, cell.x-1)
  #     live_neighbors.push(southwest) if southwest.alive?
  #   #west
  #   if cell.x > 0
  #     west = neighbor(cells, cell.y, cell.x-1)
  #     live_neighbors.push(west) if west.alive?
  #   #northwest
  #   if cell.x > 0 && cell.y > 0
  #     northwest = neighbor(cells, cell.y-1, cell.x-1)
  #     live_neighbors.push(northwest) if northwest.alive?
  #   live_neighbors

  # neighbor = (cells, x, y) ->
  #   $.grep(cells, (cell) ->
  #     cell.x == x and cell.y == y

  drawBoard()