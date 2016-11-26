class Game < ApplicationRecord
  has_one :world
  has_many :cells, through: :world


  def tick!
  end
end
