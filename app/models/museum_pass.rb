class MuseumPass < ApplicationRecord
    has_many :reservations
    validates :name, presence: true
    validates :website, presence: true
end
