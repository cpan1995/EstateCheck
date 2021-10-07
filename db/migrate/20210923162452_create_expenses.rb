class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses do |t|
      t.string :type
      t.float :amount
      t.belongs_to :property, null: false, foreign_key: true

      t.timestamps
    end
  end
end
