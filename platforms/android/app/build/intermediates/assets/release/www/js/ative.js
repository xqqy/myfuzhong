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
                if (xhr.responseText.split("$")[0] == "done") {
                    switch (xhr.responseText.split("$")[1]) {
                        case "1":
                            document.getElementById("iframe").sandbox = "allow-scripts allow-forms allow-modals";
                            document.getElementById("iframe").srcdoc = "<script>var UID='" + localStorage.getItem("uid") + "',VALUE='" + sessionStorage.getItem("atvalue") + "',NAME='" + localStorage.getItem("name") + "',TOKEN='" + localStorage.getItem("token") + "',SERVER='" + localStorage.getItem("server") + "';</script>" + xhr.responseText.split("$")[2];
                            break;
                        case "-1":
                            document.getElementById("iframe").style.height = window.innerHeight - 104 + "px";
                            document.getElementById("iframe").srcdoc = xhr.responseText.split("$")[2];
                            document.getElementById("buttons").style.display = "block";
                            if (xhr.responseText.split("$")[3] == "1") {
                                document.getElementById("focus").innerHTML = "取消关注"
                                document.getElementById("focus").addEventListener("click", rfative)
                            } else {
                                document.getElementById("focus").addEventListener("click", afative)
                            }
                            break;
                        default:
                            document.getElementById("iframe").srcdoc = xhr.responseText.split("$")[2];

                    }
                } else {
                    dialogAlert(xhr.response);
                }
            } else {
                dialogAlert("网络错误，HTTP代码：" + xhr.status);
            }
        }
    }
    xhr.send(data);
}

function afative() { //关注活动
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

function rfative() { //关注活动
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