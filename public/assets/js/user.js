$('#add_user').on('submit',function(){
    let data = $(this).serialize();
    $.ajax({
    type: 'post',
    url: '/users',
    data: data,
    success: function(){
        location.reload();
    },
    error: function(){
        alert('添加失败')
    }
    })
    return false;
})
$('#modifyBox').on('submit', '#modify_user', function(){
    let data = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
    type: 'put',
    url: `/users/${id}`,
    data: data,
    success: function(res){
        location.reload();
    },
    error: function(){
        alert('添加失败')
    }
    })
    return false
})
$('tbody').on('click', '.edit', function(){
    let id = $(this).attr('data-id');
    $.ajax({
    type: "get",
    url: `/users/${id}`,
    success: function (response) {
        var html = template('modifyTpl', {
        data: response
        }); 
        $('#modifyBox').html(html)
    }
    });
})
$('tbody').on('click', '.delete', function(){
    let id = $(this).siblings('.edit').attr('data-id');
    $.ajax({
    type: "delete",
    url: `/users/${id}`,
    success: function (response) {
        location.reload();
    }
    });
})
$('#modifyBox').on('change', '#avatar', function(){
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData:false,
    contentType:false,
    success: function (response) {
        $('#preview').attr('src', response[0].avatar);
        $('#hiddenAvatar').val(response[0].avatar);
    }
    });
})
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
    var html = template('userTpl',{
        data: response
    })
    $('tbody').html(html)
    }
});
$('.selectAll').on('change', function(){
    $('.selectOne').prop('checked',$(this).prop('checked'))
});
$('tbody').on('click', '.selectOne', function(){
    if($('.selectOne:checked').length != $('.selectOne').length){
        $('.selectAll').prop('checked',false)
    }else {
        $('.selectAll').prop('checked',true)
    }
})
$('#deleteMany').on('click', function(){
    let ids = [];
    $('.selectOne:checked').each(function(i, e){
        ids.push($(e).parents('tr').find('.edit').attr('data-id'))
    })
    let idParams = ids.join('-');
    $.ajax({
        type: "delete",
        url: "/users/"+idParams,
        success: function (response) {
            location.reload()
        }
    });  
})
