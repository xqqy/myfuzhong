if (window.Worker && localStorage.getItem("webworker")) {//检测是否支持多线程
    console.log("webworker is on");
    var worker;
    worker = new Worker("/www/js/search_worker.js");
    worker.onmessage = function (e) {
        document.getElementById("list").innerHTML = e.data;
    }
}else{
    var list,all;
    var data=new FormData;
    data.append("UID",localStorage.getItem("uid"));
    data.append("TOKEN",localStorage.getItem("token"));
    var xhr = new XMLHttpRequest;
    xhr.open("post", localStorage.getItem("server") + "/api/score.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText.split(",")[0] == "done") {
                    list = xhr.responseText.split(",");
                    all = list.length
                } else {
                    dialogAlert(xhr.responseText);
                }
            } else {
                dialogAlert("网络不能连接") + xhr.status;
                close();
            }
        }
    }
    xhr.send(data);
}

function flash() {
    if (window.Worker && localStorage.getItem("webworker")) {//自动搜索
        worker.postMessage([document.getElementById("search").value, localStorage.getItem("server"),localStorage.getItem("uid"),localStorage.getItem("token")]);
    }else{
        var now = 1,
        ret = "";
    while (now < all) {
        if (list[now+1].toUpperCase().indexOf(document.getElementById("search").value.toUpperCase()) > -1) {
            ret+='<a href="#" class="collection-item" onclick="ati('+"'"+list[now]+"'"+')">'+list[now+1]+'</a>';
        }
        now += 2;
    }
    document.getElementById("list").innerHTML=ret;
    }

}

function dialogAlert(message, title, buttonname, callback) { //通知服务
    title = title || "错误";
    buttonname = buttonname || "确定";
    callback = callback || function () {
        return;
    }
    if(navigator.notification){
        navigator.notification.alert(message, callback, title, buttonname);
    }else{
        alert(message);
    }
}
function ati(value) { //动画跳转
    sessionStorage.setItem("atid","00001");
    sessionStorage.setItem("atvalue",value)
    document.body.addEventListener("animationend", function () {
        document.location = "ative.html";
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
    },
    ready: function () {
        flash();
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("search").style.width = document.body.clientWidth - 25 + "px";
        document.body.style.animation = "showen 0.3s forwards";
    },
    onBackKeyDown: function (e) {
        document.body.addEventListener("animationend", function () {
            document.location = "index.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();