const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const TweetCompose = require("./TweetCompose.js");

$(function () {
  $("button.follow-toggle").each((index, element) => {
    new FollowToggle($(element));
  });

  $("nav.users-search").each((index, element) => new UsersSearch(element));

  $("form.tweet-compose").each((index, element) => new TweetCompose(element));
} );
