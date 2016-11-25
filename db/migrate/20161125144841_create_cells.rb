class CreateCells < ActiveRecord::Migration[5.0]
  def change
    create_table :cells do |t|
      t.boolean :alive, default: false
      t.integer :x
      t.integer :y
      t.integer :world_id

      t.timestamps
    end
  end
end
