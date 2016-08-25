class CreateMentions < ActiveRecord::Migration
  def change
    create_table :mentions do |t|
      t.integer :user_id, null: false, index: true
      t.integer :tweet_id, null: false, index: true
      t.timestamps null: false
    end

    add_index :mentions, [:tweet_id, :user_id], unique: true
  end
end
