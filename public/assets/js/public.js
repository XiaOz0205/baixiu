function formatDate(date){
    let d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}
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
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        let randomTpl = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <p class="title">{{$value.title}}</p>
                    <p class="reading">阅读({{$value.meta.views}})</p>
                    <div class="pic">
                        <img src="{{$value.thumbnail}}" alt="">
                    </div>
                </a>
            </li>
            {{/each}}
        `;
        let html = template.render(randomTpl, {data: response});
        $('#randomBox').html(html);
    }
});
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
        let latestComments = `
            {{each data}}
            <li>
                <a href="javascript:;">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.formatDate($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                </div>
                </a>
            </li>
            {{/each}}
        `;
        let html = template.render(latestComments, {data: response}); 
        $('#commentBox').html(html);
    }
});
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let categoryTpl = `
            {{each data}}
            <li>
                <a href="list.html?categoryId={{$value._id}}">
                    <i class="fa {{$value.className}}">
                    </i>{{$value.title}}
                </a>
            </li>
            {{/each}}
        `;
        let html = template.render(categoryTpl, {data: response});
        $('.categoryBox').html(html);
    }
});

$('.search form').on('submit', function(){
    let key = $(this).find('.keys').val();
    location.href = 'search.html?key=' + key; 
    return false
})

  