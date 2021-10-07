class PropertySerializer < ActiveModel::Serializer
  attributes :id, :property_tax, :real_estate_value, :mortgage, :address, :name
  has_one :user
  has_many :units
end
