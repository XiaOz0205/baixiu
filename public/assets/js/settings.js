$('#logo').on('change', function(){
    let formData = new FormData;
    let file = this.files[0]
    formData.append('logo', file);
    if(file){
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#logoSrc').val(response[0].logo);
                $('#logo_img').prop('src', response[0].logo);
            }
        });
    }
})
$('#settings').on('submit', function(e){
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false;
})

$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
       $('#logo_img').prop('src', response.logo);
       $('#logoSrc').val(response.logo);
       $('#site_name').val(response.title);
       $('#site_description').text(response.description);
       $('#site_keywords').val(response.keywords);
       $('#comment_status').prop('checked', response.comment)
       $('#comment_reviewed').prop('checked', response.review)
    }
});