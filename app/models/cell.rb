class Cell < ApplicationRecord
  belongs_to :world

  def die! alive=true; end;
end
