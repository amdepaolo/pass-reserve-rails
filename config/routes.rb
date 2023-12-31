Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :museum_passes do 
    resources :reservations
  end
  get "/reservations/:date", to: "reservations#by_date"
end
