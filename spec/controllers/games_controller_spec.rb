require 'rails_helper'

RSpec.describe GamesController, type: :controller do

  describe "GET #life" do
    it "returns http success" do
      get :life
      expect(response).to have_http_status(:success)
    end
  end

end
