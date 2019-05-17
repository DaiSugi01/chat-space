$(document).on('turbolinks:load', function() {

  /*
  関数概要：取得したユーザーを表示する
  引数：userオブジェクト
  */
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html);
  }

  /*
  関数概要：エラーメッセージを表示する
  引数：エラーメッセージ string
  */
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $('#user-search-result').append(html);
  }

  /*
  関数概要：チャットメンバー欄にユーザーを追加する
  引数：ユーザーId string, ユーザー名 string
  */
  function appendUserToMember(userId, userName) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#chat-group-users').append(html);
  }

  // 非同期通信、ユーザー名入力時の処理
  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var searchUserName = $(this).val();
    var href = '/users'
    $.ajax({
      url: href,
      type: 'GET',
      data: { name: searchUserName },
      dataType: 'json',
    })
    .done(function(users) {
      $('#user-search-result').empty();
      var currentUserId = $('.chat-group-user').attr('id')
      if(users.length !== 0) {
          users.forEach(user => {
            var member = "#chat-group-user-" + user.id
            if(!$(member).length){
              appendUser(user)
            }
          });
      } else {
        var searchUserName = $('#user-search-field').val().trim();
        searchUserName ? appendErrMsgToHTML("一致するユーザーが見つかりません") : $('#user-search-result').empty();
      }
    })
    .fail(function(){ 
      alert('ユーザー検索に失敗しました');
    })
  })

  // 追加ボタン押下時の処理
  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    var userId = $(this).data('user-id')
    var userName = $(this).data('user-name')
    appendUserToMember(userId, userName);
    $(this).parent().remove();
  })

  // 削除ボタン押下時の処理
  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
    var searchUserName = $('#user-search-field').val();
    if (searchUserName) {
      var userId = ($(this).siblings('input').val());
      var userName = ($(this).siblings('.chat-group-user__name').text());
      var user = {id: userId, name: userName}
      userName.indexOf(searchUserName) === 0 ? appendUser(user) : ""
    }
  })  
})
