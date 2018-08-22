class Converted < ApplicationRecord
  belongs_to :user
  has_one :team

  # enum status: [:cosmic, :red, :yellow, :blue, :green, :orange, :purple, :black, :white]

end
