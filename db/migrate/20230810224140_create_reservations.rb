class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.string :patron_name
      t.string :email
      t.string :phone
      t.string :patron_card
      t.string :extra_notes
      t.datetime :check_out
      t.datetime :expected_check_in
      t.integer :museum_pass_id

      t.timestamps
    end
  end
end
