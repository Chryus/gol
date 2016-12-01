$ ->
  class App.Cell
    constructor: (alive, x, y) ->
      @alive = alive
      @x = x
      @y = y

    die: ->
      alive = false

    revive: ->
      alive = true

    alive: ->
      alive

    dead: ->
      !alive
