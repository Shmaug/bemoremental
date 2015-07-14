$(document).ready(function(){
    Parse.initialize("eJ0mJYfDTIwoX9lt3OvoBcX1J5TaT52ubcf0fm1u", "l6VFB92hC37JNUaDhVr9BtxKsSbHRsPpwVtgB2Ab");
    
    function getUrlData()
    {
        var u=location.href;
        var i=u.substring(u.indexOf("?")+1,u.indexOf("&"));
        var t=u.substring(u.indexOf("&")+1);
        var val={
            item:i.split("=")[1],
            type:t.split("=")[1]
        };
        console.log(val);
        return val;
    }
    var urldata=getUrlData();
    console.log(urldata.item);
    
    Parse.Cloud.run("getItemFromId",urldata,{
        success:function(u){
            var item = u[0];
            console.log(item);
            $(".itemname")[0].innerHTML=item.get("name");
            $(".itemimg").attr("src",item.get("front").url());
        },
        error:function(err){
            console.log(err);
        }
    });
});
