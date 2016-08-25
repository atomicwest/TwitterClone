class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :followee_id, null: false, index: true
      t.integer :follower_id, null: false, index: true
      t.timestamps null: false
    end

    add_index :follows, [:followee_id, :follower_id], unique: true
  end
end
