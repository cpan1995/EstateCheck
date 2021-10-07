class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :expense_type, :amount, :is_monthly, :is_yearly, :is_weekly
  has_one :property
end
