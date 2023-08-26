class MuseumPassesController < ApplicationController

    def index
        passes = MuseumPass.all
        render json: passes, include: :reservations
    end

    def show
        pass = MuseumPass.find(params[:id])
        render json: pass, include: :reservations
    end

    def create
        pass = MuseumPass.create(pass_params)
        render json: pass, status: :created
    end

    def update
        pass = MuseumPass.find(params[:id])
        pass.update(pass_params)
        render json: pass, include: :reservations
    end

    def destroy
        pass = MuseumPass.find(params[:id])
        pass.destroy
        head :no_content
    end

    private

    def pass_params
        params.permit(:name, :website, :additional_info)
    end
end
