class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :team, :sign, :converteds
end
