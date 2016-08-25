const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor (nav) {
    this.nav = $(nav);
    this.input = this.nav.find('input');
    this.ul = this.nav.find('.users');
    this.input.keyup(this.handleInput.bind(this));
  }

  handleInput (event) {
    // if (this.input.val() === "") {
    //   this.renderResults([]);
    //   return;
    // }
    // event.preventDefault();
    this.input = this.nav.find('input');
    // console.log(this.input.val());
    let param = { query: this.input.val() };
    $.ajax({
      url: `/users/search`,
      method: 'GET',
      dataType: 'json',
      data: param,
      success: this.renderResults.bind(this)
    });
  }

  renderResults(users){
    this.ul.empty();
    for(let i=0; i < users.length; i++) {

      let li = $('<li>');
      let a = $('<a>').text(users[i].username);
      a.attr('href', `/users/${users[i].id}`);
      li.append(a);

      // $('ul.users').append(li);


      // let button = $('<button>');
      // button.addClass('follow-toggle');
      // button.data('user-id', users[i].id);
      // let state = users[i].followed ?  "follow" : "unfollowed";
      // console.log(users[i].followed);
      // button.data('initial-follow-state', state);

      let $followToggle = $("<button></button>");
        new FollowToggle($followToggle, {
          userId: users[i].id,
          followState: users[i].followed ? "followed" : "unfollowed"
        });

      li.append($followToggle);
      this.ul.append(li);

    }
    $("button.follow-toggle").each((index, element) => {
      new FollowToggle($(element));
    });
  }

}

module.exports = UsersSearch;
