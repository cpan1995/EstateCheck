class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActiveRecord::RecordInvalid, with: :show_errors

    skip_before_action :userAuthorize, only: [:create]
    

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end
    
    def show
        user = User.find_by(id: session[:user_id])
        if user 
            render json: user
        else 
            render json: {error: "Not authorized"}, status: :unauthorized 
        end
    end

    private

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :email)
    end

    def not_found
        render json: {error: "Not found"}, status: :not_found
    end

    def show_errors(exception)
        render json: {error: exception.record.errors.full_messages }, status: 422
    end
end
