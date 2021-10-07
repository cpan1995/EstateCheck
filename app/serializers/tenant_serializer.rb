class TenantSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email
  has_one :unit
end
