$('#logout').on('click',function(){
    var isConfirmed = confirm("确认退出？");
    if(!isConfirmed) return;
    $.ajax({
      type: "post",
      url: "/logout",
      success: function (response) {
        location.href = '/admin/login.html';
      },
      error:function(err){
        alert('退出失败');
      }
    });
  })

$.ajax({
  type: "get",
  url: `/users/${userId}`,
  success: function (response) {
    $('.avatar').attr('src', response.avatar)
    $('.profile h3').text(response.nickName)
  }
});