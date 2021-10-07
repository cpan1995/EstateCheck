class Property < ApplicationRecord
  belongs_to :user

  has_many :expenses, dependent: :destroy
  has_many :units, dependent: :destroy
end
