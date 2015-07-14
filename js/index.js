var simgw;
var slider1p;
var slider2p;
$(window).resize(function(){
    if($(window).width()>$(window).height()){
        $(".simg").height($(window).height()-$("#header").height());
    }else{
        $(".simg").width($(window).width());
    }
    simgw=$(".simg").width();
    $(".slider").width(simgw);
    $(".slidercontent").each(function(i){
        this.style.left=(parseInt($(this).attr('data-pos'))*-simgw)+"px";
    });
});
$(document).ready(function(){
    $("#header").load("/header.html",function(){$(window).resize()});
    $("#footer").load("/footer.html",function(){$(window).resize()});
    $(".sliderl").click(function(){
        var cont=$(this).parent().children(1).children(0);
        var p=parseInt(cont.attr('data-pos'));
        if (p>0){
            cont.animate({'left':"+="+simgw+"px"},600);
            cont.attr('data-pos',p-1);
        }
    });
    $(".sliderr").click(function(){
        var cont=$(this).parent().children(1).children(0);
        var p=parseInt(cont.attr('data-pos'));
        if (p<parseInt(cont.attr('data-pmax'))){
            cont.animate({'left':"-="+simgw+"px"},600);
            cont.attr('data-pos',p+1);
        }
    });
});
