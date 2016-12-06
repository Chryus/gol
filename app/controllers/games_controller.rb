class GamesController < ApplicationController
  respond_to :html, :json

  def life
    @width = 1200
    @height = 600
    @cols = @width/10
    @rows = @height/10
    @col_width = @width/@cols #width div by number of cols
    @row_height = @height/@rows #height div by number of rows
    @world = World.new(@rows, @cols)
    @world.randomly_populate
    #@game = Game.create(cells: @world.cells)
    respond_with cols: @cols,
                 rows: @rows,
                 col_width: @col_width, 
                 row_height: @row_height
  end
end
