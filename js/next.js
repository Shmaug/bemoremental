var userid=-1;
var shirts=[];
var averagesFound=0;
var averagesToFind=0;
var e=[];

function setCookie(name, value, days){
    var today = new Date();
    var expiry = new Date(today.getTime() + days * 24 * 3600 * 1000);
    document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function getCookie(name){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

// bubble sort
// go through array, if i+1 larger than i then swap i and i+1
// do until sorted
function sort(a){
    var l=a.length;
    var s=false;
    for (var i=0;i<l;i++){
        if (i!=l-1){
            if (a[i].r<a[i+1].r){
                var t=a[i];
                a[i]=a[i+1];
                a[i+1]=t;
                s=true;
            }
        }
    }
    if (s){
        return sort(a);
    }else{
        return a;
    }
}

function appendRows(){
    e=sort(e);
    for (i=0;i<e.length;i++){
        $(e[i].e).children(0)[0].innerHTML=i+1;
        $(".content").append(e[i].e);
    }
}

function averages(name,cfi,cfpr,cr,add){
    Parse.Cloud.run("getAvgRating",{shirt:name},{
        success:function(r){
            var avg=r;
            $(cfi).attr("value",avg);
            cfpr.innerHTML=(avg.toFixed(1))+"/10";
            
            if (add){
                e.push({e:cr,r:avg});
                appendRows();
            }
        },
        error:function(err){
            
        }
    });
}

function sliderMouseUp(){
    setCookie($(this).attr("data-cname"),this.value,7);
    window.slcfi=this;
    window.slcfpr=$(this).parent().children(5);
    avg=Parse.Cloud.run("rate",{shirt:$(this).attr("data-cname"),user:userid,val:this.value},{
        success:function(){
            
        },
        error:function(err){
            alert(err.message);
        }
    });
}

$(document).ready(function(){
    var queryFinished=false;
    Parse.initialize("eJ0mJYfDTIwoX9lt3OvoBcX1J5TaT52ubcf0fm1u", "l6VFB92hC37JNUaDhVr9BtxKsSbHRsPpwVtgB2Ab");
    var idc=getCookie("usr");
    if (idc==null){
        avg=Parse.Cloud.run("generateUser",{},{
            success:function(u){
                userid=u;
                setCookie("usr",u,60);
            },
            error:function(err){
            }
        });
    }
    else{
        userid=idc;
        Parse.Cloud.run("checkUserExists",{guid:userid},{
            success:function(u){
            },
            error:function(err){
            }
        });
    }
    
    var query = new Parse.Query("next");
    query.find({
        success:function(results){
            var container = document.createElement("div");
            container.className = "surveyContainer";
            for (var i=0;i<results.length;i++){
                var n=results[i];
                var curname=n.get("name");
                shirts.push(n);
                
                // create elements
                var cr=document.createElement("div");
                var cp=document.createElement("p");
                var cf=document.createElement("img");
                var cb=document.createElement("img");
                var cfm=document.createElement("form");
                var cfp=document.createElement("p");
                var cfi=document.createElement("input");
                var cfpr=document.createElement("p");
                
                // set classnames
                cr.className="row";
                cp.className="rowrank";
                cf.className="rowpic";
                cb.className="rowpic";
                cfm.className="rowform";
                cfp.className="rowtxt";
                cfi.className="rowslider";
                cfpr.className="rowrate";
                
                cf.src=n.get("front").url();
                cb.src=n.get("back").url();
                
                // slider
                $(cfi).attr("type","range");
                $(cfi).attr("name","rating");
                $(cfi).attr("min","0");
                $(cfi).attr("max","10");
                $(cfi).attr("step",".1");
                $(cfi).attr("data-cname",curname);
                $(cfi).attr("data-shirt",i);
                
                cfp.innerHTML=curname;
                
                // add elements in order
                cp.appendChild(container);
                cr.appendChild(cp);
                cr.appendChild(cf);
                cr.appendChild(cb);
                cfm.appendChild(cfp);
                cfm.appendChild(cfi);
                cfm.appendChild(cfpr);
                cr.appendChild(cfm);
                
                $(cfi).on("mouseup",sliderMouseUp);
                
                averages(curname,cfi,cfpr,cr,true);
            }
            queryFinished=true;
        },
        error:function(err){
            console.log("parse had an error!");
            queryFinished=true;
        }
    });
    
    $(window).load(function () {
        function wait(){
            if (!queryFinished)
                setTimeout(wait,100);
        }
        wait();
    });
});