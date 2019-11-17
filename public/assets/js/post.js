$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        let html = template('articleTpl', response);
        $('tbody').html(html);   
        let page = template('pageTpl', response);  
        $('.pagination').html(page); 
    }
});

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let categoryFilter = template('categoryTpl', {data: response})
        $('#category').html(categoryFilter)   
    }
});

function changePage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page
        },
        success: function (response) {
            let html = template('articleTpl', response);
            $('tbody').html(html);
            let page = template('pageTpl', response);  
            $('.pagination').html(page); 
        }
    });
}

$('#articleFind').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            let html = template('articleTpl', response);
            $('tbody').html(html);
            let page = template('pageTpl', response);  
            $('.pagination').html(page); 
        }
    });
    return false
})

$('tbody').on('click', '.delete', function(){
    let id = $(this).data('id');
    $.ajax({
        type: "delete",
        url: `/posts/${id}`,
        success: function (response) {
            location.reload();
        }
    });
})
$(function () {
    var id, userId;
    $('tbody').on('click', ".postCom", function () {
        id = $(this).data('id')
        userId = JSON.parse(localStorage.getItem('user'))._id
        $('#exampleModal').modal('show')
    })

    /* 点击发布 */
    $('.addCom').on('click', function () {
        var content = $('#message-text').val()
        $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            author: userId,
            content: content,
            post: id
        },
        success: function (res) {
            $('#exampleModal').modal('hide')
        }
        })
    })
})