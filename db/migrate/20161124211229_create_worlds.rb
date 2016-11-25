class CreateWorlds < ActiveRecord::Migration[5.0]
  def change
    create_table :worlds do |t|
      t.integer :rows
      t.integer :cols
      t.integer :game_id

      t.timestamps
    end
  end
end
