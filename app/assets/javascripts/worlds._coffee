$ ->
  class App.World
    constructor: (cols, rows) ->
      @cols = cols
      @rows = rows
      @cells = []
      @cellGrid = []
      i = 0
      while i < rows
        rowArray = []
        j = 0
        while j < cols
          cell = new App.Cell(false, j, i)
          @cells.push(cell)
          rowArray.push(cell)
          j++
        @cellGrid.push(rowArray)
        i++

    liveNeighbors: (cell) =>
      liveNeighbors = []
      #north
      if cell.y > 0
        north = @cellGrid[cell.y - 1][cell.x]
        liveNeighbors.push(north) if north.alive
      #northeast
      if cell.y > 0 && cell.x < @cols - 1
        northeast = @cellGrid[cell.y - 1][cell.x + 1]
        liveNeighbors.push(northeast) if northeast.alive
      #east
      if cell.x < @cols - 1
        east = @cellGrid[cell.y][cell.x + 1]
        liveNeighbors.push(east) if east.alive
      #southeast
      if cell.y < @rows - 1 && cell.x < @cols - 1
        southeast = @cellGrid[cell.y + 1][cell.x + 1]
        liveNeighbors.push(southeast) if southeast.alive
      #south
      if cell.y < @rows - 1
        south = @cellGrid[cell.y + 1][cell.x]
        liveNeighbors.push(south) if south.alive
      #southwest
      if cell.x > 0 && cell.y < @rows - 1
        southwest = @cellGrid[cell.y + 1][cell.x - 1]
        liveNeighbors.push(southwest) if southwest.alive
      #west
      if cell.x > 0
        west = @cellGrid[cell.y][cell.x - 1]
        liveNeighbors.push(west) if west.alive
      #northwest
      if cell.x > 0 && cell.y > 0
        northwest = @cellGrid[cell.y - 1][cell.x - 1]
        liveNeighbors.push(northwest) if northwest.alive
      liveNeighbors

    liveCells: () =>
      @cells.filter( (cell) ->
        return cell.alive == true
      )

    killAllCells: () =>
      @cells.forEach (cell) -> cell.die()

    randomlyPopulate: () =>
      @cells.forEach (cell) ->
        cell.alive = !!Math.floor(Math.random() * 2)
  