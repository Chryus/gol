require 'rails_helper'

RSpec.describe GamesController, type: :controller do

  describe "GET #life" do
    it "returns http success" do
      get :life, format: :json
      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(:success)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['height']).to eq(800)
      expect(parsed_response['width']).to eq(600)
      expect(parsed_response['rows']).to eq(80)
      expect(parsed_response['cols']).to eq(60)
      expect((parsed_response['cell_grid']).count).to eq(60)
    end
  end
end
