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
