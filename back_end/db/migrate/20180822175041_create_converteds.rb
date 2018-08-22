class CreateConverteds < ActiveRecord::Migration[5.2]
  def change
    create_table :converteds do |t|
      t.string :gif_url
      t.integer :team
      t.string :universe_id
      t.string :time_warning
      t.string :compatibility
      t.string :user_id
      t.string :description

      t.timestamps
    end
  end
end
