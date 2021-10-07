class AddColumnsToDb0928 < ActiveRecord::Migration[6.1]
  def change
    add_column :properties, :year_built, :integer
  end
end
