Rails.application.routes.draw do
  get "/life", to: "games#life"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "games#life"
end
