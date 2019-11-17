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