FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/test/test_image.jpg")
    user
    group
  end
end
