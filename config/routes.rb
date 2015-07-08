Rails.application.routes.draw do
  root 'ideas#index'
  resources :ideas, only: [:index, :create, :destroy, :update ]

  post '/like', to: 'ideas#like'
  post '/dislike', to: 'ideas#dislike'
end
