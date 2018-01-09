$(function(){
    var class_code = $('td.code');
     $('.button').click(function(){
         console.log('aaa');
        $('td.code').each(function(){
            if($(this).text() == $('#search').val()){
                codo_tr = $(this).parent().html();
                if($('.tr_info').text() == '' ){
                    $('.tr_info').append(codo_tr);
                    $('#search').val("");
                    $('.tr_info').css('background','rgb(172, 172, 248)');
                }else if($('.tr_info').text() != ''){
                    $('.tr_info').empty();
                    $('.tr_info').append(codo_tr);
                    $('#search').val("");
                    
                }
            }
        })
        
    });
        
    $('.tr_info').click(function(){
        $('.tr_info').empty();
        $('.tr_info').css('background','white');
    });





})