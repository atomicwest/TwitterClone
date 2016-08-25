class SessionsController < ApplicationController
  before_action :require_not_logged_in, only: [:create, :new]
  before_action :require_logged_in, only: [:destroy]

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    unless @user.nil?
      sign_in(@user)
      redirect_to feed_url
    else
      flash.now[:error] = "Invalid Credentials"
      render :new

    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  def new
    render :new
  end
end
