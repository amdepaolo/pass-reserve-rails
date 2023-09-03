class ReservationsController < ApplicationController

    def index
        pass = MuseumPass.find(params[:museum_pass_id])
        reservations = pass.reservations
        render json: reservations
    end

    def create
        pass = MuseumPass.find(params[:museum_pass_id])
        reservation = pass.reservations.new(reservation_params)
        reservation.expected_check_in = reservation.check_out.next_day(2)
        reservation.save!
        render json: pass.reservations, status: :created
    rescue ActiveRecord::RecordInvalid
        render json: {error: "Reservation error, check for conflicts"}, status: :unprocessable_entity
    end

    def update
        pass = MuseumPass.find(params[:museum_pass_id])
        reservation = pass.reservations.find(params[:id])
        reservation.update(reservation_params)
        render json: reservation, status: :accepted
    end

    def destroy
        pass = MuseumPass.find(params[:museum_pass_id])
        reservation = pass.reservations.find(params[:id])
        reservation.destroy
        head :no_content
    end

    private

    def reservation_params
        params.permit(:patron_name, :email, :phone, :extra_notes, :patron_card, :check_out, :expected_check_in)
    end
end
