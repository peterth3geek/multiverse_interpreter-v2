class User < ApplicationRecord
  has_many :readings
  has_many :converteds

end
