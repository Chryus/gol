class GamesController < ApplicationController
  respond_to :html, :json

  def life
    @height = 600
    @width = 1000
    @cols = @width/4
    @rows = @height/4
    @col_width = @width/@cols #width div by number of cols
    @row_height = @height/@rows #height div by number of rows
    @world = World.new(@cols, @rows)
    @world.randomly_populate
    respond_with col_width: @col_width, 
                 row_height: @row_height,
                 cell_grid: @world.cell_grid
  end
end
