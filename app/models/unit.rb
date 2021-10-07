class Unit < ApplicationRecord
  validates :bed_num, presence: true
  validates :bath_num, presence: true
  validates :rent_amount, presence: true
  
  belongs_to :property

  has_one :tenant, dependent: :destroy
end
