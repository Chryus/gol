class Game < ApplicationRecord

  attr_accessor :world, :seeds

  def initialize(world=World.new, seeds=[])
    @world = world
    @seeds = seeds

    seeds.each { |seed| world.cell_grid[seed[0]][seed[1]].alive = true }
  end

  def tick!
    live_cells_next_round = []
    dead_cells_next_round = []
    world.cells.each do |cell|
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
