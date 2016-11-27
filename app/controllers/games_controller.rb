class GamesController < ApplicationController
  respond_to :html, :json

  def life
    @cols = 600/10
    @rows = 800/10
    @world = World.new(@cols, @rows)
    @world.randomly_populate
    respond_with height: 800,
                 width: 600,
                 cols: @cols, 
                 rows: @rows,
                 cell_grid: @world.cell_grid
  end
end
