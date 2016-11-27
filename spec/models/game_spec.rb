require 'rails_helper'

RSpec.describe Game, type: :model do

  subject { Game.new }
  let!(:world) { World.new }

  it 'should create a new game subject' do
    subject.is_a?(Game).should be true
  end

  it 'should respond to proper methods' do
    subject.should respond_to(:world)
    subject.should respond_to(:seeds)
  end

  it 'should initialize properly' do
    subject.world.is_a?(World).should be true
    subject.seeds.is_a?(Array).should be true
  end

  it 'should seed properly' do
    game = Game.new(world, [[1, 2], [0,2]])
    world.cell_grid[1][2].alive?.should be true
  end

  context 'Rules' do

    # col  0    1    2    y
    # 0 [[0,0][1,0][2,0]]
    # 1 [[1,0][1,1][2,1]]
#row# 2 [[2,0][2,1][2,2]]
#     x

    let!(:game) { Game.new }
    let!(:cell) { Cell.new(1,1) }
    
    context 'Rule 1: Any live cell with fewer than two live neighbors dies, as if caused by under-population.' do

      it 'should kill a live cell with 0 live neighbors' do
        game.world.cell_grid[1][1].alive = true
        game.world.cell_grid[1][1].alive.should be true
        game.tick!
        world.cell_grid[1][1].should be_dead
      end
      
      it 'should kill a live cell with 1 live neighbor' do
        game = Game.new(world, [[0,1], [1,1]])
        world.live_neighbors(cell).count.should eq(1)
        game.tick!
        world.cell_grid[0][1].should be_dead
        world.cell_grid[1][1].should be_dead
      end

      it 'doesnt kill a live cell with 2 live neighbors' do
        game = Game.new(world, [[0,1], [1,1], [2,1]])
        world.live_neighbors(cell).count.should eq(2)
        game.tick!
        world.cell_grid[1][1].should be_alive
      end

    end

    context 'Rule 2: Any live cell with two or three live neighbours lives on to the next generation.' do
      
      it 'should let a live cell with 2 neighbors live' do
        game = Game.new(world, [[0,1], [1,1], [2,1]])
        world.live_neighbors(cell).count.should eq(2)
        game.tick!
        world.cell_grid[0][1].should be_dead
        world.cell_grid[1][1].should be_alive
        world.cell_grid[2][1].should be_dead
      end

      it 'should let a live cell with 2 or 3 neighbors live' do
        game = Game.new(world, [[0,1], [1,1], [2,1], [2,2]])
        world.live_neighbors(cell).count.should eq(3)
        game.tick!
        world.cell_grid[0][1].should be_dead
        world.cell_grid[1][1].should be_alive
        world.cell_grid[2][1].should be_alive
        world.cell_grid[2][2].should be_alive
      end
    end

    context 'Rule 3: Any live cell with more than three live neighbours dies, as if by overcrowding.' do

      it 'should kill a live cell with more than 3 neighbors' do
        game = Game.new(world, [[0,1], [1,1], [2,1], [1,2], [2,2]])
        world.live_neighbors(cell).count.should eq(4)
        game.tick!
        world.cell_grid[0][1].should be_alive
        world.cell_grid[1][1].should be_dead
        world.cell_grid[2][1].should be_alive
        world.cell_grid[1][2].should be_dead
        world.cell_grid[2][2].should be_alive
      end
    end

    context 'Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction' do
      it 'should reanimate any dead cell with exactly three live neighbors' do
        game = Game.new(world, [[1,1], [2,1], [1,2], [2,2]])
        game.world.cell_grid[1][1].alive = false
        world.live_neighbors(cell).count.should eq(3)
        game.tick!
        world.cell_grid[1][1].should be_alive
        world.cell_grid[2][1].should be_alive
        world.cell_grid[1][2].should be_alive
        world.cell_grid[2][2].should be_alive
      end
    end
  end
end
