class Reservation < ApplicationRecord
    belongs_to :museum_pass
    validates :patron_name, presence: true
    validate :prevent_double_reservations

    def prevent_double_reservations
        range = self.check_out..self.expected_check_in
        pass = self.museum_pass
        if pass.reservations.find_by(check_out: range)
            errors.add(:check_out, "Cannot complete. Conflicts with prior reservation")
        elsif pass.reservations.find_by(expected_check_in: range)
            errors.add(:expected_check_in, "Cannot complete. Conflicts with prior reservation")
        end
    end
end
