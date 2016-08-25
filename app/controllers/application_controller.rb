class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    return nil unless self.session[:session_token]
    User.find_by(session_token: self.session[:session_token])
  end

  def sign_in(user)
    user.reset_token
    self.session[:session_token] = user.session_token
  end

  def sign_out
    self.session[:session_token] = nil
  end

  def require_logged_in
    redirect_to new_session_url unless current_user
  end

  def require_not_logged_in
    redirect_to feed_url if current_user
  end



end
