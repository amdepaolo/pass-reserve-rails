class CreateMuseumPasses < ActiveRecord::Migration[7.0]
  def change
    create_table :museum_passes do |t|
      t.string :name
      t.string :website
      t.text :additional_info

      t.timestamps
    end
  end
end
