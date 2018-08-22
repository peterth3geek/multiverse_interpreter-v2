class CreateReadings < ActiveRecord::Migration[5.2]
  def change
    create_table :readings do |t|
      t.integer :user_id
      t.string :color
      t.string :lucky_number
      t.string :lucky_time
      t.string :mood
      t.string :description
      t.string :compatibility

      t.timestamps
    end
  end
end
