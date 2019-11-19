 $.ajax({
      type: "get",
      url: "/categories",
      success: function (response) {
        let html = template('showCategoryTpl', {data: response});
        $('tbody').html(html)
      }
    });
    $('#addCategory').on('submit', function(){
      var formData = $(this).serialize();
      $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
          location.reload();
        }
      });
      return false; 
    })
    $('tbody').on('click', '.edit', function(){
      var id = $(this).attr('data-id');
      $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
          var html = template('modifyCategoryTpl', response);
          $('#categoryBox').html(html)
        }
      });
    })
    $('tbody').on('click', '.delete', function(){
      var id = $(this).siblings('.edit').attr('data-id');
      $.ajax({
        type: "delete",
        url: "/categories/" + id,
        success: function (response) {
          location.reload()
        }
      });
    })
    $('#categoryBox').on('submit', '#modifyCategory', function(){
      let formData = $(this).serialize();
      let id = $(this).attr('data-id');
      $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function (response) {   
          location.reload()
        }
      });
      return false;
    })