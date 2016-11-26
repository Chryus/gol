require "rails_helper"

RSpec.describe World, :type => :model do
  let(:game) { create(:game) }
  let(:world) { game.world }

  before do
    world.build_cells
  end

  let(:cell) { world.cells.find_by(x: 1, y: 1) }
    
  it 'should create a new world world' do
    world.is_a?(World).should be true
  end

  it 'should respond to proper methods' do 
    world.should respond_to(:rows)
    world.should respond_to(:cols)
    world.should respond_to(:cells)
    world.should respond_to(:live_neighbors)
    world.should respond_to(:live_cells)
    world.should respond_to(:randomly_populate)
  end

  it 'should detect a neighbor to the north' do
    north = world.cells.find_by(x: 1, y: 0)
    north.should be_dead
    north.revive!
    north.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the northeast' do
    northeast = world.cells.find_by(x: 2, y: 0)
    northeast.should be_dead
    northeast.revive!
    northeast.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the east' do
    east = world.cells.find_by(x: 2, y: 1)
    east.should be_dead
    east.revive!
    east.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the southeast' do
    southeast = world.cells.find_by(x: 2, y: 2)
    southeast.should be_dead
    southeast.revive!
    southeast.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the south' do
    south = world.cells.find_by(x: 1, y: 2)
    south.should be_dead
    south.revive!
    south.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the southwest' do
    southwest = world.cells.find_by(x: 0, y: 2)
    southwest.should be_dead
    southwest.revive!
    southwest.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the west' do
    west = world.cells.find_by(x: 0, y: 1)
    west.should be_dead
    west.revive!
    west.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the northwest' do
    northwest = world.cells.find_by(x: 0, y: 0)
    northwest.should be_dead
    northwest.revive!
    northwest.should be_alive
    world.live_neighbors(cell).count.should eq(1)
  end

  it 'should count the number of live cells' do
    world.live_cells.size.should eq(0)
  end

  it 'should randomly populate the world' do
    world.live_cells.size.should eq(0)
    world.randomly_populate
    world.live_cells.size.should_not eq(0)
  end
end