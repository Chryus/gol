class Cell

  attr_accessor :alive, :x, :y

  def initialize(x=0, y=0)
    @alive = false
    @x = x
    @y = y
  end

  def die!
    alive = false
  end

  def revive!
    alive = true
  end

  def alive?; alive; end

  def dead?; !alive; end
end
