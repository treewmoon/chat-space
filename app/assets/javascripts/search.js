$(function() {

  var user_result = $("#user-search-result");
  var user_list = $("#chat-group-users")

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    user_result.append(html);
  }

  function appendNoUser(text){
    var html = `<div class="chat-group-user clearfix">${text}</div>`
      user_result.append(html);
  }

  function appendUserList(user_id, user_name){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    user_list.append(html);
  }

  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert("メンバー検索に失敗しました");
    });
  });
  $('#user-search-result').on('click', '.user-search-add', function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    appendUserList(user_id, user_name);
    $(this).parent().remove();
    $('#user-search-field').val('');
  });
});
