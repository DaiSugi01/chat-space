$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var imageTag = (message.image) ? `<img class="chat__main__message__text__image" src="${message.image}">` : ""
    var html = `<div class="chat__main__message" data-message-id="${message.id}"->
                  <div class="chat__main__message__user-info">
                    <p class="chat__main__message__user-info__user-name">
                      ${message.user_name} 
                    </p>
                    <p class="chat__main__message__user-info__date">
                      ${message.created_at} 
                    </p>
                  </div>
                  <div class="chat__main__message__text">
                    <p class="chat__main__message__text__body">
                      ${message.body} 
                    </p>
                    ${imageTag}
                  </div>
                </div>`
    return html;
  }

  var reloadMessages = function() {
    var last_message_id = $('.chat__main__message:last').data('messageId')
    var href = window.location.href.replace(/messages/g,"api/messages")
    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var chatMainHeight = $('#chat-main').get(0).scrollHeight;
      messages.forEach(function(message) {
        var html = buildHTML(message)
        $('#chat-main').append(html)
        $('#chat-main').animate({scrollTop: chatMainHeight}, 300);
      });
    })
    .fail(function() {
      alert('自動更新に失敗しました')
    });
  };

  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr("action");
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var chatMainHeight = $('#chat-main').get(0).scrollHeight;
      $('#message_body').val('')
      $('#new_message')[0].reset();
      $('#chat-main').append(html)
      $('#chat-main').animate({scrollTop: chatMainHeight}, 300);
    })
    .fail(function(){
      alert('メッセージを入力して下さい')
    })
    .always(function() {
      $('#submit').prop('disabled', false);
    })
  })
  setInterval(reloadMessages, 5000);
})
