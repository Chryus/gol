# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  bw = 1000
  bh = 600
  p = 10
  canvas = document.getElementsByTagName('canvas')
  context = canvas[0].getContext('2d')
  drawBoard = ->

  drawBoard()

 # def draw
 #    @game.world.cells.each do |cell|
 #      if cell.alive?
 #        draw_quad(cell.x * @col_width, cell.y * @row_height, @alive_color,
 #                  cell.x * @col_width + (@col_width - 1), cell.y * @row_height, @alive_color,
 #                  cell.x * @col_width + (@col_width - 1), cell.y * @row_height + (@row_height - 1), @alive_color,
 #                  cell.x * @col_width, cell.y * @row_height + @row_height - 1, @alive_color)
 #      else
 #        draw_quad(cell.x * @col_width, cell.y * @row_height, @dead_color,
 #                  cell.x * @col_width + (@col_width - 1), cell.y * @row_height, @dead_color,
 #                  cell.x * @col_width + (@col_width - 1), cell.y * @row_height + @row_height - 1, @dead_color,
 #                  cell.x * @col_width, cell.y * @row_height + (@row_height - 1), @dead_color)
 #      end
 #    end
 #  end