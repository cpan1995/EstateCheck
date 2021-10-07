class CreateUnits < ActiveRecord::Migration[6.1]
  def change
    create_table :units do |t|
      t.integer :bed_num
      t.integer :bath_num
      t.float :rent_amount
      t.belongs_to :property, null: false, foreign_key: true

      t.timestamps
    end
  end
end
