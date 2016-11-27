class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :cell_grid, array: true
    end
    add_index :games, :cell_grid, using: 'gin'
  end
end
