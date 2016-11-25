class World < ApplicationRecord
  has_many :cells

  def build_cells    
    # col  0    1    2    x
    # 0 [[0,0][1,0][2,0]]
    # 1 [[0,1][1,1][2,1]]
#row# 2 [[0,2][1,2][2,2]]
#     y
    @cell_grid =  Array.new(rows) do |row| #each row creates a new array with columns and each column creates a new cell
                    Array.new(cols) do |col|
                      self.cells.create(x: col, y: row)
                    end
                  end
  end
end
