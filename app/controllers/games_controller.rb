class GamesController < ApplicationController
  respond_to :html, :json

  def life
    @height = 600
    @width = 1000
    @cols = @width/10
    @rows = @height/10
    @world = World.new(@cols, @rows)
    @world.randomly_populate
    respond_with height: @height,
                 width: @width,
                 cols: @cols, 
                 rows: @rows,
                 cell_grid: @world.cell_grid
  end
end
