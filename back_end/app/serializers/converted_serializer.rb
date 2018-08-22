class ConvertedSerializer < ActiveModel::Serializer
  attributes :id, :gif_url, :team, :universe_id, :time_warning, :compatibility, :user, :description
end
