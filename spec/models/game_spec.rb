require 'rails_helper'

RSpec.describe Game, type: :model do

  let(:game) { create(:game) }
  let(:world) { game.world }
  
  before do
    world.build_cells
  end

  let(:cell) { world.cells.find_by(x: 1, y: 1) }
  
  it 'should create a new game game' do
    game.is_a?(Game).should be true
  end

  it 'should respond to proper methods' do
    game.should respond_to(:world)
  end

  it 'should initialize properly' do
    game.world.is_a?(World).should be true
  end

  context 'Rules' do

        # col  0    1    2    x
        # 0 [[0,0][1,0][2,0]]
        # 1 [[0,1][1,1][2,1]]
    #row# 2 [[0,2][1,2][2,2]]
    #     y

    context 'Rule 1: Any live cell with fewer than two live neighbors dies, as if caused by under-population.' do

      it 'should kill a live cell with 0 live neighbors' do
        world.cells.find_by(x: 0, y: 1).revive!
        world.cells.find_by(x: 0, y: 1).alive.should be true
        game.tick!
        world.cells.find_by(x: 0, y: 1).should be_dead
      end
      
      it 'should kill a live cell with 1 live neighbor' do
        world.give_life([[0, 1],[1, 1]])
        world.live_neighbors(cell).count.should eq(1)
        game.tick!
        world.cells.find_by(x: 0, y: 1).should be_dead
        world.cells.find_by(x: 1, y: 1).should be_dead
      end

      it 'doesnt kill a live cell with 2 live neighbors' do
        world.give_life([[0,1], [1,1], [2,1]])
        world.live_neighbors(cell).count.should eq(2)
        game.tick!
        world.cells.find_by(x: 1, y: 1).should be_alive
        world.cells.find_by(x: 0, y: 1).should be_dead
        world.cells.find_by(x: 2, y: 1).should be_dead
      end

    end

    context 'Rule 2: Any live cell with two or three live neighbours lives on to the next generation.' do
      
      it 'should let a live cell with 2 neighbors live' do
        world.give_life([[0,1], [1,1], [2,1]])
        world.live_neighbors(cell).count.should eq(2)
        game.tick!
        world.cells.find_by(x: 0, y: 1).should be_dead
        world.cells.find_by(x: 1, y: 1).should be_alive
        world.cells.find_by(x: 2, y: 1).should be_dead
      end

      it 'should let a live cell with 2 or 3 neighbors live' do
        world.give_life([[0,1], [1,1], [2,1], [2,2]])
        world.live_neighbors(cell).count.should eq(3)
        game.tick!
        world.cells.find_by(x: 0, y: 1).should be_dead
        world.cells.find_by(x: 1, y: 1).should be_alive
        world.cells.find_by(x: 2, y: 1).should be_alive
        world.cells.find_by(x: 2, y: 2).should be_alive
      end

    end

    context 'Rule 3: Any live cell with more than three live neighbours dies, as if by overcrowding.' do

      it 'should kill a live cell with more than 3 neighbors' do
        world.give_life([[0,1], [1,1], [2,1], [1,2], [2,2]])
        world.live_neighbors(cell).count.should eq(4)
        game.tick!
        world.cells.find_by(x: 0, y: 1).should be_alive
        world.cells.find_by(x: 1, y: 1).should be_dead
        world.cells.find_by(x: 2, y: 1).should be_alive
        world.cells.find_by(x: 1, y: 2).should be_dead
        world.cells.find_by(x: 2, y: 2).should be_alive
      end
    end

    context 'Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction' do
      it 'should reanimate any dead cell with exactly three live neighbors' do
        world.give_life([[1,1], [2,1], [1,2], [2,2]])
        world.cells.find_by(x: 1, y: 1).die!
        world.live_neighbors(cell).count.should eq(3)
        game.tick!
        world.cells.find_by(x: 1, y: 1).should be_alive
        world.cells.find_by(x: 2, y: 1).should be_alive
        world.cells.find_by(x: 1, y: 2).should be_alive
        world.cells.find_by(x: 2, y: 2).should be_alive
      end
    end
  end
end
