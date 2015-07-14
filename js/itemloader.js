$(document).ready(function(){
    Parse.initialize("eJ0mJYfDTIwoX9lt3OvoBcX1J5TaT52ubcf0fm1u", "l6VFB92hC37JNUaDhVr9BtxKsSbHRsPpwVtgB2Ab");
    
    var parseobjname=$(document.getElementById("itemloader")).attr("data-parseobj");
    console.log(parseobjname);
    
    var pobj=Parse.Object.extend(parseobjname);
    var query=new Parse.Query(pobj);
    var curRow;
    var items=[];
    query.find({
        success:function(results){
            for (var i=0;i<results.length;i++){
                var res=results[i];
                items.push(res);
                if (i==0 || i%3==0){
                    curRow=document.createElement("div");
                    curRow.className="row";
                    $("#content").append(curRow);
                }
                var container=document.createElement("div");
                var curItem=document.createElement("div");
                var curImage=document.createElement("img");
                container.className="itemContainer";
                curItem.className="item";
                $(curItem).attr("data-itemindex",i);
                curImage.className="itemimg";
                curImage.src=res.get("front").url();
                curItem.appendChild(curImage);
                $(curItem).append(res.get("name"));
                container.appendChild(curItem);
                curRow.appendChild(container);
                
                $(document).on("click","div.item",function(e){
                    var item = items[parseInt($(this).attr("data-itemindex"))];
                    window.location.href="/item.html?item="+item.id+"&type="+parseobjname;
                });
            }
        },
        error:function(err){
            
        }
    });
});
