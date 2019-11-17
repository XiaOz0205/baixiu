$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        var html = template('commentTpl', response);
        $('tbody').html(html);  
        let page = template('pageTpl', response);  
        $('#pages').html(page);  
    }
});
function changePage(page){
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page
        },
        success: function (response) {
            let html = template('commentTpl', response);
            $('tbody').html(html);
            let page = template('pageTpl', response);  
            $('#pages').html(page); 
        }
    });
}
$('tbody').on('click', '.edit', function(){
    let id = $(this).data('id');
    let status = $(this).data('state');
    $.ajax({
        type: "put",
        url: `/comments/${id}`,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        }
    });
})
$('tbody').on('click', '.delete', function(){
    let id = $(this).siblings('.edit').data('id');
    if(confirm("是否确认删除此评论？")){
        $.ajax({
            type: "delete",
            url:`/comments/${id}`,
            success: function () {
                location.reload();
            }
        });
    }
})