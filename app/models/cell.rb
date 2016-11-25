class Cell < ApplicationRecord
  belongs_to :world

  def die! 
    self.update_attributes(alive: false)
  end

  def revive!
    self.update_attributes(alive: true)
  end

  def dead?
    !alive
  end
end
