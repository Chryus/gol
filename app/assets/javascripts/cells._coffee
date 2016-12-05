$ ->
  class App.Cell
    constructor: (alive, x, y) ->
      @alive = alive
      @x = x
      @y = y

    die: ->
      this.alive = false

    revive: ->
      this.alive = true

    alive: ->
      this.alive

    dead: ->
      !this.alive
