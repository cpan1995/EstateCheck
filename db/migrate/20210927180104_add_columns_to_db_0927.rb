class AddColumnsToDb0927 < ActiveRecord::Migration[6.1]
  def change
    add_column :units, :size, :float
    add_column :properties, :name, :string
    add_column :properties, :is_single, :boolean
  end
end
