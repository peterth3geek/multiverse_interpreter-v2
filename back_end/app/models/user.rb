class User < ApplicationRecord
  has_many :readings
  has_many :converteds

  validates :username, presence: true
  validates :username, length: {in: 6..15}
  validates :uniqueness, {case_sensitive: false}

end
