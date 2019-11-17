$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        let html = template('slideTpl', {data: response})
        $('tbody').html(html);
    }
});
$('#file').on('change', function(){
    let formData = new FormData();
    formData.append('image', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#image').val(response[0].image)
        }
    });
})
$('#addSlide').on('submit', function(){
    let formData=$(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function () {
            location.reload();
        }
    });
    return false;
})
$('tbody').on('click', '.delete', function(){
    let id = $(this).data('id');
    $.ajax({
        type: "delete",
        url: `/slides/${id}`,
        success: function () {
            location.reload();
        }
    });
})