Rails.application.routes.draw do
  
  resources :expenses
  resources :tenants
  resources :units
  resources :properties
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  get "/me", to: "users#show"

  #Sessions Routes
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  #userRoutes
  post '/signup', to: "users#create"

  #propertiesRoutes
  post '/properties/add', to: "properties#create"

  #unitsRoutes
  post '/units/add', to: "units#create"
  get '/units/property/:id', to: "units#fetch_by_property"

  #ExpensesRoutes
  get '/expenses/property/:id', to: "expenses#find_all_by_property"
end
