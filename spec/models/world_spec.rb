require "rails_helper"

RSpec.describe World, :type => :model do
  subject { World.new }
    
  it 'should create a new world subject' do
    subject.is_a?(World).should be true
  end

  it 'should respond to proper methods' do 
    subject.should respond_to(:rows)
    subject.should respond_to(:cols)
    subject.should respond_to(:cell_grid)
    subject.should respond_to(:live_neighbors_around_cell)
    subject.should respond_to(:cells)
    subject.should respond_to(:live_cells)
    subject.should respond_to(:randomly_populate)
  end

  it 'should create proper cell grid upon initialization' do
    subject.cell_grid.is_a?(Array).should be true
    subject.cell_grid.each do |row| 
      row.is_a?(Array).should be true
      row.each do |col| 
        col.is_a?(Cell).should be true
      end
    end
  end

  it 'should detect a neighbor to the north' do
    subject.cell_grid[0][1].should be_dead
    subject.cell_grid[0][1].alive = true
    subject.cell_grid[0][1].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the northeast' do
    subject.cell_grid[0][2].should be_dead
    subject.cell_grid[0][2].alive = true
    subject.cell_grid[0][2].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the east' do
    subject.cell_grid[1][2].should be_dead
    subject.cell_grid[1][2].alive = true
    subject.cell_grid[1][2].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the southeast' do
    subject.cell_grid[2][2].should be_dead
    subject.cell_grid[2][2].alive = true
    subject.cell_grid[2][2].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the south' do
    subject.cell_grid[2][1].should be_dead
    subject.cell_grid[2][1].alive = true
    subject.cell_grid[2][1].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the southwest' do
    subject.cell_grid[2][0].should be_dead
    subject.cell_grid[2][0].alive = true
    subject.cell_grid[2][0].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the west' do
    subject.cell_grid[1][0].should be_dead
    subject.cell_grid[1][0].alive = true
    subject.cell_grid[1][0].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should detect a neighbor to the northwest' do
    subject.cell_grid[0][0].should be_dead
    subject.cell_grid[0][0].alive = true
    subject.cell_grid[0][0].should be_alive
    subject.live_neighbors_around_cell(cell).count.should eq(1)
  end

  it 'should count the number of live cells' do
    subject.live_cells.size.should eq(0)
  end

  it 'should randomly populate the world' do
    subject.live_cells.size.should eq(0)
    subject.randomly_populate
    subject.live_cells.size.should_not eq(0)
  end
end