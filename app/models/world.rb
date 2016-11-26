class World < ApplicationRecord
  has_many :cells

  # col  0    1    2    x
    # 0 [[0,0][1,0][2,0]]
    # 1 [[0,1][1,1][2,1]]
#row# 2 [[0,2][1,2][2,2]]
#     y
  def build_cells    
    @cell_grid =  Array.new(rows) do |row| #each row creates a new array with columns and each column creates a new cell
                    Array.new(cols) do |col|
                      self.cells.create(x: col, y: row)
                    end
                  end
  end

  def live_neighbors(cell)
    live_neighbors = []
    # north
    if cell.y > 0
      north = Cell.find_by(x: cell.x, y: cell.y-1)
      live_neighbors << north if north.alive?
    end
    # northeast
    if cell.y > 0 && cell.x < cols-1
      northeast = Cell.find_by(x: cell.x+1, y: cell.y-1)
      live_neighbors << northeast if northeast.alive?
    end
    # east
    if cell.x < cols-1
      east = Cell.find_by(x: cell.x+1, y: cell.y)
      live_neighbors << east if east.alive?
    end
    # southeast
    if cell.x < cols-1 && cell.y < rows-1
      southeast = Cell.find_by(x: cell.x+1, y: cell.y+1)
      live_neighbors << southeast if southeast.alive?
    end
    # south
    if cell.y < rows-1
      south = Cell.find_by(x: cell.x, y: cell.y+1)
      live_neighbors << south if south.alive?
    end
    # southwest
    if cell.x > 0 && cell.y < rows-1
      southwest = Cell.find_by(x: cell.x-1, y: cell.y+1)
      live_neighbors << southwest if southwest.alive?
    end
    # west
    if cell.x > 0
      west = Cell.find_by(x: cell.x-1, y: cell.y)
      live_neighbors << west if west.alive?
    end
    # northwest
    if cell.x > 0 && cell.y > 0
      northwest = Cell.find_by(x: cell.x-1, y: cell.y-1)
      live_neighbors << northwest if northwest.alive?
    end
    live_neighbors
  end

  def live_cells
    cells.select { |cell| cell.alive }
  end

  def randomly_populate
    cells.each { |cell| cell.revive! }
  end


end
