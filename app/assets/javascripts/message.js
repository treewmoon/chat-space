$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var image = message.image_url ? `<img src="${message.image_url}" class='lower-message__image'>` : "";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    ${image}
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__submit').prop("disabled", false);
    })
    .fail(function(){
      alert('メッセージの投稿に失敗しました。');
    })
  })

  var interval = setInterval(function(){
    var lastMessageId = $('.message').last().attr('message-id');
    var presentHTML = window.location.href;
    if (presentHTML.match(/\/groups\/\d+\/messages/)) {
      $.ajax ({
        url: presentHTML,
        type: 'GET',
        data: {id: lastMessageId},
        dataType: 'json',
      })
      .done(function(json){
        var $messages = $('.messages');
        var insertHTML ="";
        json.forEach(function(message) {
          insertHTML += buildHTML(message);
          $messages.append(insertHTML);
          $messages.animate({scrollTop: $messages[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        alert('');
      })
    } else {
      clearInterval(interval)
    }
  },5000);
})
