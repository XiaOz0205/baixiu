var id = getUrlParams('id');
$.ajax({
    type: "get",
    url: `/posts/${id}`,
    success: function (response) {
        let html = template('postTpl', response);
        $('#postBox').html(html);
    }
});

$('#postBox').on('click', '.like', function(){
    $.ajax({
        type: "post",
        url: `/posts/fabulous/${id}`,
        success: function (response) {
            alert('点赞成功, 谢谢支持');
            var html = `赞((${response.meta.likes})`;
            $('.like span').html(html);
        }
    });
})

let review = false;
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        review = response.review;
        let html = template('commentTpl', response);
        $('#commentSubmit').html(html)
    }
});
$('.content').on('submit', '.comment', function(){
    let content = $('.comment textarea').val();
    let state = review ? 0 : 1 ;
    $.ajax({
        type: "post",
        url: "/comments",
        data: {
            post : id,
            state : state,
            content : content
        },
        success: function (response) {
            alert('评论成功');
            location.reload();
        },
        error: function(err){
            alert('评论失败');
        }
    });
    return false;
})
