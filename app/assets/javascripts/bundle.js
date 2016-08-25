/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(1);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(2);
	const UsersSearch = __webpack_require__(3);
	const TweetCompose = __webpack_require__(4);
	
	$(function () {
	  $("button.follow-toggle").each((index, element) => {
	    new FollowToggle($(element));
	  });
	
	  $("nav.users-search").each((index, element) => new UsersSearch(element));
	
	  $("form.tweet-compose").each((index, element) => new TweetCompose(element));
	} );


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(2);
	
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	class TweetCompose {
	  constructor(element){
	    this.$form = $(element);
	    this.$form.submit(this.submit.bind(this));
	    this.$form.find(".content").keyup(this.countChars.bind(this));
	  }
	
	  countChars(event) {
	    let content = this.$form.find(".content")[0];
	    let charsLeft = 140 - content.value.length;
	    let strongEl = $('.chars-left');
	    if (charsLeft <= 0) {
	      content.value = (content.value.slice(0,140));
	      strongEl.text("Message is over character limit");
	    } else {
	      strongEl.text(charsLeft);
	    }
	  }
	
	  submit(event) {
	    event.preventDefault();
	    this.serial = this.$form.serializeJSON();
	    // console.log(serial.tweet.mentioned_user_ids[0]);
	    this.request = {tweet: { content: this.serial.tweet.content,
	      mentioned_user_ids: this.serial.tweet.mentioned_user_ids} };
	
	    $(":input").each( (i,e) => $(e).prop('disabled', true) );
	    // $(":input").each( (i,e) => console.log(e));
	    $.ajax({
	      method: 'POST',
	      url: '/tweets',
	      data: this.request,
	      dataType: 'json',
	      success: this.handleSuccess.bind(this)
	    });
	  }
	
	  clearInput() {
	    $(":input").empty();
	  }
	
	  handleSuccess() {
	    $(":input").each( (i,e) => $(e).prop('disabled', false) );
	    this.clearInput();
	
	    // let $aCurrent = $(<a>)
	    // $aCurrent.attr("href", window.location.pathname)
	    // $aCurrent.text("")
	    // let $aOther = $(<a>).attr("href", `/users/${this.request.tweet.mentioned_user_ids[0]}`)
	    let message = this.request.tweet.content;
	    let time = new Date();
	    let tweet = `${message} @ ${time}`;
	    let $li = $('<li>');
	    $li.append(tweet);
	    $('#feed').prepend($li);
	  }
	
	}
	
	module.exports = TweetCompose;


/***/ },
/* 5 */
/***/ function(module, exports) {



/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map