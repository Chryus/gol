FactoryGirl.define do
  factory :game do
    association :world, factory: :world, cols: 3, rows: 3
  end
end