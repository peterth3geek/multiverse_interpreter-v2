class User < ApplicationRecord
  belongs_to :team
  has_many :readings
  has_many :converteds

end
