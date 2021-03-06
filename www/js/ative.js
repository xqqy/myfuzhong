function xhr() {
    var data = new FormData;
    data.append("ATID", sessionStorage.getItem("atid"));
    if (localStorage.getItem("token")) {
        data.append("TOKEN", localStorage.getItem("token"));
        data.append("UID", localStorage.getItem("uid"));
    }
    var xhr = new XMLHttpRequest;
    xhr.open("post", localStorage.getItem("server") + "/api/ative.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText.split("/meow")[0] == "done") {
                    switch (xhr.responseText.split("/meow/")[1]) {
                        case "1":
                            document.getElementById("iframe").sandbox = "allow-scripts allow-forms allow-modals";
                            document.getElementById("iframe").srcdoc = "<script>var UID='" + localStorage.getItem("uid") + "',VALUE='" + sessionStorage.getItem("atvalue") + "',NAME='" + localStorage.getItem("name") + "',TOKEN='" + localStorage.getItem("token") + "',SERVER='" + localStorage.getItem("server") + "';</script>" + xhr.responseText.split("/meow/")[2];
                            break;
                        case "-1":
                            document.getElementById("iframe").style.height = window.innerHeight - 104 + "px";
                            document.getElementById("iframe").srcdoc = xhr.responseText.split("/meow/")[2];
                            document.getElementById("buttons").className = "ativeb";
                            if (xhr.responseText.split("/meow/")[3] == "1") {
                                document.getElementById("focus").innerHTML = "取消关注"
                                document.getElementById("focus").addEventListener("click", rfative)
                            } else {
                                document.getElementById("focus").addEventListener("click", afative)
                            }
                            if (xhr.responseText.split("/meow/")[4] == "0") {
                                document.getElementById("join").innerHTML = "加入活动"
                                document.getElementById("join").addEventListener("click", jative)
                            } else {
                                document.getElementById("join").className+=" disabled";
                            }
                            if(xhr.responseText.split("/meow/")[5]=="0"){
                                document.getElementById("verify").addEventListener("click",verify)
                            }else{
                                document.getElementById("verify").className+=" disabled";
                            }
                            break;
                        default:
                            document.getElementById("iframe").srcdoc = xhr.responseText.split("/meow/")[2];

                    }
                } else {
                    dialogAlert(xhr.response.split("/meow/")[0]);
                }
            } else {
                dialogAlert("网络错误，HTTP代码：" + xhr.status);
            }
        }
    }
    xhr.send(data);
}

function verify(){
    document.body.addEventListener("animationend", function () {
        document.location = "zyfz.html";
    });
    document.body.style.animation = "hidden 0.3s forwards";
}
function afative() { //关注活动
    if(!localStorage.getItem("token")){
        dialogAlert("你没有登录")
    }
    var data = new FormData;
    data.append("UID", localStorage.getItem("uid"));
    data.append("TOKEN", localStorage.getItem("token"));
    data.append("ATID", sessionStorage.getItem("atid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post",localStorage.getItem("server")+"/api/afative.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "done") {
                    localStorage.setItem("cardtime","0");
                    dialogAlert("关注成功","成功","确定",function(){location.reload();})
                } else {
                    dialogAlert(xhr.responseText)
                }
            } else {
                dialogAlert("网络错误，HTTP代码：" + xhr.status)
            }
        }
    }
    xhr.send(data)
}

function rfative() { //取消关注活动
    if(!localStorage.getItem("token")){
        dialogAlert("你没有登录")
    }
    var data = new FormData;
    data.append("UID", localStorage.getItem("uid"));
    data.append("TOKEN", localStorage.getItem("token"));
    data.append("ATID", sessionStorage.getItem("atid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post",localStorage.getItem("server") + "/api/rfative.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "done") {
                    localStorage.setItem("cardtime","0");
                    dialogAlert("取消关注成功","成功","确定",function(){location.reload();})
                } else {
                    dialogAlert(xhr.responseText)
                }
            } else {
                dialogAlert("网络错误，HTTP代码：" + xhr.status)
            }
        }
    }
    xhr.send(data)
}

function jative(){
    if(!localStorage.getItem("token")){
        dialogAlert("你没有登录")
    }
    var data = new FormData;
    data.append("UID", localStorage.getItem("uid"));
    data.append("TOKEN", localStorage.getItem("token"));
    data.append("ATID", sessionStorage.getItem("atid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post",localStorage.getItem("server")+"/api/jative.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "done") {
                    localStorage.setItem("cardtime","0");
                    dialogAlert("加入成功，已为你自动关注此活动","成功","确定",function(){location.reload();})
                } else {
                    dialogAlert(xhr.responseText)
                }
            } else {
                dialogAlert("网络错误，HTTP代码：" + xhr.status)
            }
        }
    }
    xhr.send(data)
}

function dialogAlert(message, title, buttonname, callback) { //通知服务
    title = title || "错误";
    buttonname = buttonname || "确定";
    callback = callback || function () {
        return;
    }
    if (navigator.notification) {
        navigator.notification.alert(message, callback, title, buttonname);
    } else {
        alert(message);
    }
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
    },
    ready: function () {
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("iframe").style.height = window.innerHeight - 64 + "px";
        xhr();
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
