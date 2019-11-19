
var categoryId = getUrlParams('categoryId');
$.ajax({
    type: "get",
    url: `/posts/category/${categoryId}`,
    success: function (response) {
        let html = template('postTpl', {data: response});
        $('#postBox').html(html);
    }
});
$.ajax({
    type: "get",
    url: `/categories/${categoryId}`,
    success: function (response) {
        $('#category_name').text(response.title);
    }
});