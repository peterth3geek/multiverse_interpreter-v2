class ChangeTeamToTeamId < ActiveRecord::Migration[5.2]
  def change
    rename_column :converteds, :team, :team_id
  end
end
