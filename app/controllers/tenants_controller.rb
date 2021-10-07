class TenantsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActiveRecord::RecordInvalid, with: :show_errors

    def create
        user = User.find_by(id: session[:user_id])
        new_tenant = Tenant.create!(tenants_params)
        render json: new_tenant, status: :created
    end

    def index
        user = User.find_by(id: session[:user_id])
        all_properties = user.properties
        units_ids = []
        
        all_properties.each do |property|
            all_units = property.units
            all_units.each do |unit|
                units_ids << unit.id
            end
        end
        all_tenants = Tenant.all
        filtered_tenants = all_tenants.select{
            |tenant| units_ids.include?(tenant.unit_id)
        }
        render json: filtered_tenants
    end

    def destroy
        current_tenant = Tenant.find(params[:id])
        current_tenant.destroy
        render json: current_tenant, status: 200
    end

    def update
        current_tenant = Tenant.find(params[:id])
        current_tenant.update!(tenants_params)
        all_tenants = Tenant.all
        render json: all_tenants
    end

    private

    def tenants_params
        params.permit(:first_name, :last_name, :email, :unit_id)
    end

    def not_found
        render json: {error: "Not found"}, status: :not_found
    end

    def show_errors(exception)
        render json: {error: exception.record.errors.full_messages }, status: 422
    end
end
