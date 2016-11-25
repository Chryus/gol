require 'rails_helper'

RSpec.describe Cell, type: :model do
  
  let(:game) { create :game }
  let(:world) { create :world, game_id: game.id }
  let(:cell) { create :cell, world_id: world.id, x: 0, y: 0 }
  

  it 'should create a new cell subject' do
    cell.is_a?(Cell).should be true
  end

  it 'should respond to proper methods' do
    cell.should respond_to(:alive)
    cell.should respond_to(:x)
    cell.should respond_to(:y)
    cell.should respond_to(:alive?)
    cell.should respond_to(:die!)
    cell.should respond_to(:revive!)
  end

  it 'should initialize properly' do
    cell.alive.should be false
    cell.x.should eq(0)
    cell.y.should eq(0)
  end
end
