# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

JEDI = %w(ObiWan MaceWindu Yoda AdiGalia Atris Nomi Luke MaraJade)
""
JEDI.each do |jedi|
  # user = User.create!(username: jedi, email: "#{jedi}@jediorder.org", password: "#{jedi}1138")
  user = User.create!(username: jedi, password: "#{jedi}1138")
end

POSTS = [
  "I have the high ground!",
  "Do or do not, there is no try",
  "Wars not make one great",
  "We are keepers of the peace, not soldiers",
  "Always with you, it cannot be done",
  "The Force is what gives a Jedi their power",
  "It's an energy field created by all living things",
  "There is no emotion, there is peace",
  "There is no ignorance, there is knowledge",
  "There is no passion, there is serenity",
  "There is no chaos, there is harmony",
  "There is no death, there is the Force",
  "I'm getting too old for this sort of thing",
  "And these last points, too accurate for sandpeople",
  "Only Imperial Stormtroopers are so precise. LOL jk",
  "You must feel the Force around you. The tree. The rock",
  "That is why you fail"
]

User.all.each do |user|
  30.times do
    Tweet.create!(user_id: user.id,
                  content: POSTS.sample,
                  created_at: rand(50).years.ago)
  end
end
