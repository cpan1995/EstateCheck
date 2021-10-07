class CreateTenants < ActiveRecord::Migration[6.1]
  def change
    create_table :tenants do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.belongs_to :unit, null: false, foreign_key: true

      t.timestamps
    end
  end
end
