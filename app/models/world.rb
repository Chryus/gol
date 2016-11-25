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
    live_neighbors
  end

  def live_cells
    cells.select { |cell| cell.alive }
  end

  def randomly_populate
    cells.each { |cell| cell.revive! }
  end


end
