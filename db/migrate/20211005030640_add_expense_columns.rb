class AddExpenseColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :expenses, :is_weekly, :boolean
    add_column :expenses, :is_monthly, :boolean
    add_column :expenses, :is_yearly, :boolean
  end
end
