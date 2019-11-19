let key = getUrlParams('key');
$.ajax({
    type: "get",
    url: `/posts/search/${key}`,
    success: function (response) {
        let html = template('postTpl',{data: response});
        $('#postBox').html(html);
        $('#category_name').text('"' + key + '"的搜索结果:');
    }
});