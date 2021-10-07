class UnitSerializer < ActiveModel::Serializer
  attributes :id, :bed_num, :bath_num, :rent_amount, :property_id
  has_one :property
  has_one :tenant
end
