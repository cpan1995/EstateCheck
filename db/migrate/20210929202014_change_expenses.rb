class ChangeExpenses < ActiveRecord::Migration[6.1]
  def change
    rename_column :expenses, :type, :expense_type
  end
end
