class Game < ApplicationRecord
  has_one :world
  has_many :cells, through: :world


  def tick!
    live_cells_next_round = []
    dead_cells_next_round = []
    cells.each do |cell|
      if cell.alive? # rules 1, 2 & 3
        if world.live_neighbors(cell).count.between?(2,3)
          live_cells_next_round << cell
        else
          dead_cells_next_round << cell
        end
      elsif world.live_neighbors(cell).count == 3 # rule 4
        live_cells_next_round << cell
      end
    end
    live_cells_next_round.each { |cell| cell.revive! }
    dead_cells_next_round.each { |cell| cell.die! }
  end
end
