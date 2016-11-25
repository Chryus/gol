require 'rails_helper'

RSpec.describe Cell, type: :model do
  subject { Cell.new }

  it 'should create a new cell subject' do
    subject.is_a?(Cell).should be true
  end

  it 'should respond to proper methods' do
    subject.should respond_to(:alive)
    subject.should respond_to(:x)
    subject.should respond_to(:y)
    subject.should respond_to(:alive?)
    subject.should respond_to(:die!)
  end

  it 'should initialize properly' do
    subject.alive.should be false
    subject.x.should eq(0)
    subject.y.should eq(0)
  end
end
