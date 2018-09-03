$(function(){
    console.log(jsonArray);
    if (jsonArray.length>0){
        var html ='<dt>内容1:</dt>';
        for(var i=0;i<jsonArray.length;i++){
            html += '<dd pindex="'+i+'"><a href="javascript:;">'+ jsonArray[i].name+'</a></dd>'
        }
        $('#select_info').html(html)
    }
    $('#select_info').on('click','dd',function(){  //点击一级菜单 展示二级菜单的内容
        $('#select_area').html('');
        var pindex = $(this).attr('pindex');
        $(this).find("a").addClass('active').parent().siblings().find("a").removeClass('active');
        if (jsonArray[pindex].children.length>0){
            var html = '<dt>内容2：</dt>';
            for (var i = 0; i < jsonArray[pindex].children.length;i++){
                html += '<dd pindex="' + pindex + '" cindex="' + i + '"><a href="javascript:;">' + jsonArray[pindex].children[i].name + '</a></dd>'  
            }
            html += '<dd class="multiple"><a href = "javascript:;" > +多选</a></dd>';
            $('#select_type').html(html);
            getCheckDate();
        }else{
            $('#select_type').html('');
        }
    });

    $('#select_type').on('click','dd',function(){
        if ($(this).hasClass('multiple')) { //说明点击的多选
            $(this).find('a').toggleClass('active');  //说明点击的是单选
            if (!$(this).find('a').hasClass('active')) {
                $(this).parents('#select_type').find('a').removeClass('active');
                $('#select_area').html('');
                getCheckDate();
            }
        } else {
            if ($('#select_type .multiple a').hasClass('active')) {
                var flag=0;
                $(this).find("a").toggleClass('active');
                var pvindex = $(this).attr('pvindex');
                var cindex = $(this).attr('cindex');
                var html ='<dt>内容3：</dt>';
                $(this).parents('#select_type').find('dd').each(function () {
                    if (!$(this).hasClass('multiple')) {
                        if ($(this).find('a').hasClass('active')) {
                            flag++;
                            var pindex = $(this).attr('pindex');
                            var cindex = $(this).attr('cindex');
                            if (jsonArray[pindex].children[cindex].children && jsonArray[pindex].children[cindex].children.length > 0) {
                                for (var i = 0; i < jsonArray[pindex].children[cindex].children.length; i++) {
                                    html += '<dd pindex="' + pindex + '" cindex="' + cindex + '" currindex="' + i + '"><a href="javascript:;">' + jsonArray[pindex].children[cindex].children[i].name + '</a></dd>'
                                }
                            }
                        }
                    }
                });
                if (flag>0){
                    html += '<dd class="multiple"><a href = "javascript:;" > +多选</a></dd>';
                    $('#select_area').html(html);
                }else{
                    $('#select_area').html('');
                }
            }else{
                $(this).find("a").addClass('active').parent().siblings().find("a").removeClass('active');
                var pindex = $(this).attr('pindex');
                var cindex = $(this).attr('cindex');
                if (jsonArray[pindex].children[cindex].children && jsonArray[pindex].children[cindex].children.length>0){
                    var html = '<dt>内容3：</dt>';
                    for (var i = 0; i < jsonArray[pindex].children[cindex].children.length; i++) {
                        html += '<dd pindex="' + pindex + '" cindex="' + cindex + '" currindex="' + i + '"><a href="javascript:;">' + jsonArray[pindex].children[cindex].children[i].name + '</a></dd>'
                    }
                    html += '<dd class="multiple"><a href = "javascript:;" > +多选</a></dd>';
                    $('#select_area').html(html);
                }else{
                    $('#select_area').html('');
                }
            }
            getCheckDate();
        }
    })
    $('#select_area').on('click','dd',function () {
        if ($(this).hasClass('multiple')) { //说明点击的多选
            $(this).find('a').toggleClass('active');  //说明点击的是单选
            if (!$(this).find('a').hasClass('active')) {
                $(this).parents('#select_area').find('a').removeClass('active');
                getCheckDate();
            }
        } else {
            if ($('#select_area .multiple a').hasClass('active')) {
                $(this).find("a").toggleClass('active');
            } else {
                $(this).find("a").addClass('active').parent().siblings().find("a").removeClass('active');
            }
        }
        getCheckDate();
    });
    function getCheckDate(){
        var newArray = [];
        $('.select .select-list').each(function(){
            $(this).find('dd').each(function(){
                if (!$(this).hasClass('multiple')) {
                    if ($(this).find('a').hasClass('active')){
                        var json={
                            pindex: $(this).attr('pindex'),
                            cindex: $(this).attr('cindex'),
                            currindex: $(this).attr('currindex'),
                        }
                        newArray.push(json);
                    }
                }
            });
        });
        $('.select-no').on('click','em',function(){
            $(this).remove();
            var pindex = $(this).attr('pindex');
            var cindex = $(this).attr('cindex');
            var currindex = $(this).attr('currindex');
            if (pindex && !cindex && !currindex){
                $('#select_info').find('a').removeClass('active');
                $('#select_type').html('');
                $('#select_area').html('');
                $('.select-no').html('暂时没有选择过滤条件');
            } else if (pindex && cindex && !currindex){
                $('#select_type').find('dd').eq(cindex).find('a').removeClass('active');
                var f=0;
                $('#select_type').find('dd').each(function(){
                    if (!$(this).hasClass('multiple') && $(this).find('a').hasClass('active')){
                        f++;
                    }
                });
                if(f==0){
                    $('#select_area').html('');
                }
               
            } else if (pindex && cindex && currindex){
                $('#select_area').find('dd').eq(currindex).find('a').removeClass('active');
            }
        });
        if(newArray.length>0){
            var html=""
            for(var i=0;i<newArray.length;i++){
                if (newArray[i].pindex && !newArray[i].cindex && !newArray[i].currindex){
                    html += '<em pindex="' + newArray[i].pindex+'" >' + jsonArray[newArray[i].pindex].name+'</em>'
                } else if (newArray[i].pindex && newArray[i].cindex && !newArray[i].currindex){
                    html += '<em pindex="' + newArray[i].pindex + '" cindex="' + newArray[i].cindex +'">' + jsonArray[newArray[i].pindex].children[newArray[i].cindex].name + '</em>'
                } else if (newArray[i].pindex && newArray[i].cindex && newArray[i].currindex){
                    html += '<em pindex="' + newArray[i].pindex + '" cindex="' + newArray[i].cindex + '" currindex="' + newArray[i].currindex + '">' + jsonArray[newArray[i].pindex].children[newArray[i].cindex].children[newArray[i].currindex].name + '</em>'
                }
            }
            $('.select-no').html(html);
        }else{
            $('.select-no').text('暂时没有选择过滤条件')
        }
    }
});
   



