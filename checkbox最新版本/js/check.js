var fun=(function(a){
    this.a=a;
    return function(){
        a+=this.a;
        return a;
    }
})(function(a,b){
    return a;
});
console.log(fun(4));
$(function(){   
    $('.select .select-list').hide();
    $('.select .select-list').eq(0).show();
    var name1=[];   
    var name2=[];
    var name3=[];
    var array=[];
    function clearCheck(i){
        $('.select .select-list').each(function(index){
            if (index > i){
                $(this).find('a').removeClass('active');
            }
        });
    }
    $('.select-no').on('click','em',function(){
        var text=$(this).text();
        $('.select .select-list').each(function(vindex){
            $(this).find('dd').each(function(index){
                if ($(this).find('a').text() == text){
                    console.log(vindex);
                    if(vindex==0){ //删除数组name1的数据
                        var nameA=[];
                        for(var i=0;i<name1.length;i++){
                            if (name1[i] != text){
                                nameA.push(name1[i]);
                            }
                        }
                        name1=nameA;
                        if (name1.length == 0) {
                            $('.select .select-list').eq(1).hide();
                            clearCheck(vindex);
                        }
                    }else if(vindex==1){
                        var nameB = [];
                        for (var i = 0; i < name2.length; i++) {
                            if (name2[i] != text) {
                                nameB.push(name2[i]);
                            }
                        }
                        name2 = nameB;
                        if(name2.length==0){
                            $('.select .select-list').eq(2).hide();
                            clearCheck(vindex);
                            name3=[];
                        }
                    }else if(vindex==2){
                        var nameC = [];
                        for (var i = 0; i < name3.length; i++) {
                            if (name3[i] != text) {
                                name3=name3.slice(i, 1);
                                nameC.push(name3[i]);
                            }
                        }
                        name3 = nameC;
                    }
                    $(this).find('a').removeClass('active');
                }
            });
            getAllfunction();
        });
        $(this).remove();
    });
    function getAllfunction(){
        var html='';
        array=[];
        var array=name1.concat(name2).concat(name3);
        if(array.length>0){
            for(var i=0;i<array.length;i++){
                html += '<em>' + array[i]+'</em>';
            }
            console.log(html);
            $('.select-no').html(html);
        }else{
            $('.select-no').html('暂时没有选择过滤条件');
        }
        
    }

    $('#select_info dd').on('click',function(){
        name1=[];
        $(this).find("a").addClass('active').parent().siblings().find("a").removeClass('active');
        name1.push($(this).find('a').text());
        if(name1.length>0){
            $('.select .select-list').eq(1).show();
        }
        console.log(name1);
        getAllfunction();
    });
    $('#select_type dd').on('click', function () {
        if ($(this).hasClass('multiple')){ //说明点击的多选
            $(this).find('a').toggleClass('active');
            if(!$(this).find('a').hasClass('active')){
                $(this).parents('#select_type').find('a').removeClass('active');
                name2 = [];
            }
        }else{
            name2 = [];
            if($('#select_type .multiple a').hasClass('active')){
                $(this).find("a").toggleClass('active');
                $(this).parents('#select_type').find('dd').each(function(){
                    if (!$(this).hasClass('multiple')){
                        if($(this).find('a').hasClass('active')){
                            name2.push($(this).find('a').text());  
                        } 
                    }
                });
            else{
                $(this).find("a").addClass('active').parent().siblings().find("a").removeClass('active');
                name2.push($(this).find('a').text());
            }
        }
        if (name2.length > 0) {
            $('.select .select-list').eq(2).show();
        }else{
            $('.select .select-list').eq(2).hide();
        }
        getAllfunction();
    });

    $('#select_area dd').on('click', function () {
        if ($(this).hasClass('multiple')) { //说明点击的多选
            $(this).find('a').toggleClass('active');
            if (!$(this).find('a').hasClass('active')) {
                $(this).parents('#select_area').find('a').removeClass('active');
                name3 = [];
            }
        } else {
            name3 = [];
            if ($('#select_area .multiple a').hasClass('active')) {
                $(this).find("a").toggleClass('active');
                $(this).parents('#select_area').find('dd').each(function () {
                    if (!$(this).hasClass('multiple')) {
                        if ($(this).find('a').hasClass('active')) {
                            name3.push($(this).find('a').text());
                        }
                    }
                });
            } else {
                $(this).find("a").addClass('active').parent().siblings().find("a").removeClass('active');
                name3.push($(this).find('a').text());
            }
        }
        getAllfunction();
    });
})