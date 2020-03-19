const API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

$(function(){
    $('.btn-search').click(function(){
        $.get(API_URL, {}, function(data){
            var list = data.list;
            var total = data.total;
        
            $('.total').html('총 '+total+'개의 패스트푸드점을 찾았습니다.');

            var $list = $('.list');

            for(var i=0; i<list.length; i++){
                var item = list[i];
                //각 아이템 하나하나마다 DOM객체를 만들어서 $list에 추가한다.

                //1. 템플릿을 복제한다.
                var $elem = $('#item-template')
                    .clone()
                    .removeAttr('id');
                //2. 복제한 템플릿에 데이터를 세팅한다.
                    $elem.find('.item-no').html(i+1);
                    $elem.find('.item-name').html(item.name);
                    $elem.find('.item-addr').html(item.addr);

                    $list.append($elem);
                //3. 목록에 복제한 템플릿을 추가한다.
            }
        });
    });
});



