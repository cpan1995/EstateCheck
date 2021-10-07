class PropertiesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActiveRecord::RecordInvalid, with: :show_errors

    def create
        user = User.find_by(id: session[:user_id])
        newProperty = Property.create(user_id: user.id)
        newProperty.update!(properties_params)
        render json: newProperty, status: :created
    end

    def index
        user = User.find_by(id: session[:user_id])
        all_properties = user.properties
        render json: all_properties
    end

    def destroy
        current_property = Property.find(params[:id])
        current_property.destroy
        render json: current_property, status: 200
    end

    def show
        user = User.find_by(id: session[:user_id])
        current_property = user.properties.find(params[:id])
        render json: current_property
    end

    private

    def properties_params
        params.permit(:property_tax, :real_estate_value, :mortgage, :address, :name, :year_built, :property)
    end

    def not_found
        render json: {error: "Not found"}, status: :not_found
    end

    def show_errors(exception)
        render json: {error: exception.record.errors.full_messages }, status: 422
    end
end
