class MuseumPassesController < ApplicationController

    def index
        passes = MuseumPass.all
        render json: passes
    end

    def create
        pass = MuseumPass.create(pass_params)
        render json: pass, status: :created
    end

    def update
        pass = MuseumPass.find(params[:id])
        pass.update(pass_params)
        render json: pass, status: :accepted
    end

    private

    def pass_params
        params.permit(:name, :website, :additional_info)
    end
end
