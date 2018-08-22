class Converted < ApplicationRecord
  belongs_to :user
  belongs_to :team

  # enum status: [:cosmic, :red, :yellow, :blue, :green, :orange, :purple, :black, :white]

end
