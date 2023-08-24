class ReservationsController < ApplicationController

    def index
        pass = MuseumPass.find(params[:museum_pass_id])
        reservations = pass.reservations
        render json: reservations
    end

    def create
        pass = MuseumPass.find(params[:museum_pass_id])
        reservation = pass.reservations.create(reservation_params)
        reservation.expected_check_in = reservation.check_out + 2
        render json: reservation, status: :created
    end

    def destroy
        pass = MuseumPass.find(params[:museum_pass_id])
        reservation = pass.reservations.find(params[:id])
        reservation.destroy
        head :no_content
    end

    private

    def reservation_params
        params.permit(:patron_name, :email, :phone, :extra_notes, :patron_card. :check_out)
    end
end
