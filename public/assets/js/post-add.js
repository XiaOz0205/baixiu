$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
       let html = template('categoryTpl', {data: response});
       $('#category').html(html) 
    }
});
$('#feature').on('change', function(){
    let file = this.files[0];
    let formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)
        }
    });
})
$('#articleAdd').on('submit', function(){
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href="/admin/posts.html"
        }
    });
    return false;
})

function getUrlParams(paramName){
    let paraArr = location.search.substr(1).split('&');
    for(let i = 0; i < paraArr.length; i++){
      let tmp = paraArr[i].split('=');
      if (tmp[0] == paramName){
        return tmp[1];
      }
    } 
    return -1;
  }