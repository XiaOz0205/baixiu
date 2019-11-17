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
function formatDate(date){
    let d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}
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