Rails.application.routes.draw do
  root 'ideas#index'
  resources :ideas, only: [:index, :create, :delete, :update, :new]
end
