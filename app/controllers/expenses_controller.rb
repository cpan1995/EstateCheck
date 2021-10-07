class ExpensesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActiveRecord::RecordInvalid, with: :show_errors

    def create
        new_expense = Expense.create!(expenses_params)
        render json: new_expense, status: :created
    end

    def index
        user = User.find_by(id: session[:user_id])
        all_properties = user.properties

        new_properties_id_array = []
        all_properties.each do |property|
            new_properties_id_array << property.id
        end
        all_expenses = Expense.all
        filtered_expenses = all_expenses.select{
            |expense| new_properties_id_array.include?(expense.property_id)
        }
        render json: filtered_expenses, status: :created
    end

    def destroy
        found = Expense.find(params[:id])
        found.destroy
        render json: found, status: 204
    end

    def find_all_by_property
        all_expense = Expense.all.where(property_id: params[:id])
        render json: all_expense
    end

    private

    
    
    def expenses_params
        params.permit(:expense_type, :amount, :property_id, :is_monthly, :is_weekly, :is_yearly)
    end

    def not_found
        render json: {error: "Not found"}, status: :not_found
    end

    def show_errors(exception)
        render json: {error: exception.record.errors.full_messages }, status: 422
    end
end
