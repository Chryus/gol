class Game < ApplicationRecord
  has_one :world
  has_many :cells, through: :world
end
