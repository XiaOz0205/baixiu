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
function formatDate(date){
  let d = new Date(date);
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}

$.ajax({
  type: "get",
  url: `/users/${userId}`,
  success: function (response) {
    $('.avatar').attr('src', response.avatar)
    $('.profile h3').text(response.nickName)
  }
});