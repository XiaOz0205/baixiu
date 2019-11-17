$('#logout').on('click',function(){
    var isConfirmed = confirm("确认退出？");
    if(!isConfirmed) return;
    $.ajax({
      type: "get",
      url: "/logout",
      success: function (response) {
        location.href = '/login';
      },
      error:function(){
        alert('退出失败');
      }
    });
  })