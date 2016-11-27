class World
  attr_accessor :rows, :cols, :cell_grid, :cells

  def initialize(rows=3, cols=3)
    @rows = rows
    @cols = cols
    @cells = []
    
    # col  0    1    2    y
    # 0 [[0,0][1,0][2,0]]
    # 1 [[1,0][1,1][2,1]]
#row# 2 [[2,0][2,1][2,2]]
#     x

    @cell_grid =  Array.new(rows) do |row| #each row creates a new array with columns and each column creates a new cell
                    Array.new(cols) do |col|
                      cell = Cell.new(col, row)
                      cells << cell
                      cell
                    end
                  end
  end

  def live_neighbors(cell)
    live_neighbors = []
    #north
    if cell.y > 0
      north = self.cell_grid[cell.y - 1][cell.x]
      live_neighbors << north if north.alive?
    end
    #northeast
    if cell.y > 0 && cell.x < cols - 1
      northeast = self.cell_grid[cell.y - 1][cell.x + 1]
      live_neighbors << northeast if northeast.alive?
    end
    #east
    if cell.x < cols - 1
      east = self.cell_grid[cell.y][cell.x + 1]
      live_neighbors << east if east.alive?
    end
    #southeast
    if cell.y < rows - 1 && cell.x < cols - 1
      southeast = self.cell_grid[cell.y + 1][cell.x + 1]
      live_neighbors << southeast if southeast.alive?
    end
    #south
    if cell.y < rows - 1
      south = self.cell_grid[cell.y + 1][cell.x]
      live_neighbors << south if south.alive?
    end
    #southwest
    if cell.x > 0 && cell.y < rows - 1 
      southwest = self.cell_grid[cell.y + 1][cell.x - 1]
      live_neighbors << southwest if southwest.alive?
    end
    #west
    if cell.x > 0
      west = self.cell_grid[cell.y][cell.x - 1]
      live_neighbors << west if west.alive?
    end
    #northwest
    if cell.x > 0 && cell.y > 0
      northwest = self.cell_grid[cell.y - 1][cell.x - 1]
      live_neighbors << northwest if northwest.alive?
    end
    live_neighbors
  end

  def live_cells
    cells.select { |cell| cell.alive? }
  end

  def randomly_populate
    cells.each { |cell| cell.revive! if [true, false].sample }
  end
end
