const API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

//검색 버튼을 클릭하는 함수
$(function(){
    $('.btn-search').click(function(){
        var searchKeyword = $('#txt-search').val();

        search(1, 10, searchKeyword);
    });

    $('#txt-search').on('keypress',function(e){
        if(e.keyCode === 13){
            $('.btn-search').trigger('click');
        }
    });
});    

//실제로 서버에 요청을 보내주는 함수
function search(page, perPage, searchKeyword){
    if(typeof page !== 'number' || page < 1)
        page = 1;

    if(typeof perPage !== 'number' || page<=0)
        perPage = 10;

    $.get(API_URL, {
        page: page,
        perPage: perPage,
        searchKeyword: searchKeyword
    }, function(data){
        var list = data.list;
        var total = data.total;

        $('.total').html('총 '+total+'개의 패스트푸드점을 찾았습니다.');

        var $list = $('.list');

        for(var i=0; i<list.length; i++){
            var item = list[i];

            var $elem = $('#item-template')
                .clone()
                .removeAttr('id');

            $elem.find('.item-no').html(i+1);
            $elem.find('.item-name').html(item.name);
            $elem.find('.item-addr').html(item.addr);

            $list.append($elem);
        }

        showPaging(page);
    });
}

//페이지 영역 구현 함수
function showPaging(page, perPage, total){
    var $paging = $('.paging').empty();

    var pervPage = pageStart -1;

    if(prevPage<1)
        prevPage = 1;
    
    var nextPage = pageEnd +1;
    if(nextPage>totalPages)
        nextPage = totalPages;

    for(var i=perStart; i<=perEnd; i++){
        var $elem = $('<a href = "javascript:search(' + i + ',' + perPange + ')">' + i + '</a>');

        if(i===page){
            $elem.addClass('current');
        }

        $paging.append($elem);
    }
}
