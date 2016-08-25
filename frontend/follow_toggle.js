class FollowToggle {
  constructor($button, obj){

    this.button = $button;

    if (obj) {
      this.followState = obj.followState;
      this.userId = obj.userId;
    } else {
      this.followState = $('.follow-toggle' ).data("initial-follow-state");
      this.userId = $('.follow-toggle' ).data("user-id");
    }

    // console.log(this.followState);
    this.render();
    this.button.on("click", this.handleClick.bind(this));
  }

  render() {
    this.button.prop('disabled', false);
    if (this.followState === "unfollowed") {
      this.button.text("Follow");
      // this.nextState = "followed";
      this.button.data("follow-state",  "unfollowed");
      this.button.data("initial-follow-state",  "unfollowed");
    } else {
      this.button.text("Unfollow");
      // this.nextState = "unfollowed";
      this.button.data("follow-state", "follow");
      this.button.data("initial-follow-state", "follow");
    }
  }

  toggleState(){
    if (this.followState === "unfollowed") {
      this.followState = "follow";
    } else {
      this.followState = "unfollowed";
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.button.prop('disabled', true);
    let method = "POST";

    if (this.followState === "follow") {
      method = "DELETE";
    }

    $.ajax({
      method: `${method}`,
      url: `/users/${this.userId}/follow`,
      dataType: 'json',
      success: () => {
        this.toggleState();
        this.render();
      }

    });
  }
}



module.exports = FollowToggle;
