class UnitsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :show_errors
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def create
        current_property = Property.find(params[:property_id])
        new_unit = Unit.create!(unit_params)
        new_unit.update(property_id: current_property.id)
        render json: new_unit, status: :created
    end

    def index
        user = User.find_by(id: session[:user_id])
        all_properties = user.properties
        properties_array = []
        
        all_properties.each do |property|
            properties_array << property.id
        end
        all_units = Unit.all
        filtered_units = all_units.select{
            |unit| properties_array.include?(unit.property_id)
        }
        render json: filtered_units
    end

    def show
        current_unit = Unit.find(params[:id])
        render json: current_unit
    end

    def fetch_by_property
        current_property = Property.find(params[:id])
        total_units = current_property.units
        render json: total_units
    end

    private

    def unit_params
        params.permit(:bed_num, :bath_num, :rent_amount, :size, :property_id)
    end

    def not_found
        render json: {error: "Not found"}, status: :not_found
    end

    def show_errors
        render json: {error: "Could Not Create Unit"}, status: :not_found
    end
    
end
