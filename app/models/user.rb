class User < ActiveRecord::Base
  # validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :password_digest, :session_token, presence: true
  # validates :username, :email, uniqueness: true
  # validates :username, uniqueness: true
  validates :password, length: {minimum: 8, allow_nil: true}

  has_many :in_follows, class_name: "Follow", foreign_key: "followee_id"
  has_many :out_follows, class_name: "Follow", foreign_key: "follower_id"
  has_many :followers, through: :in_follows, source: :follower
  has_many :followees, through: :out_follows, source: :followee

  has_many :tweets, dependent: :destroy

  before_validation :ensure_session_token

  attr_reader :password


  #------------Authentication---------------------------------------
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    # debugger
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def reset_token
    self.session_token = SecureRandom::urlsafe_base64(32)
    self.save!
  end

  #-----------Tweet logic------------------------

  #query the database for all tweets created by the current user or
  #people the user follows
  def feed_tweets(max_tweets = nil, latest_date = nil )
    @tweets = Tweet.joins(:user)
      .joins("LEFT OUTER JOIN follows ON users.id = follows.followee_id")
      .where("tweets.user_id = :id OR follows.follower_id = :id", id: self.id)
      .order("tweets.created_at DESC")
      .uniq
    #debugger

    @tweets = @tweets.limit(max_tweets) if max_tweets
    @tweets = @tweets.where("tweets.created_at < ?", latest_date)

    @tweets
  end

  def follows?(user)
    out_follows.exists?(followee_id: user.id)
  end

  #-----------also for Authentication-------------
  private

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(32)
  end

end
