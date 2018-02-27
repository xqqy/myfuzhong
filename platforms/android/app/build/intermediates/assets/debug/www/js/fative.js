function ati(ve) { //动画跳转
    sessionStorage.setItem("atid", ve);
    document.body.addEventListener("animationend", function () {
        window.parent.document.location = "ative.html";
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}

function init() {
    var xhr = new XMLHttpRequest;
    var data = new FormData;
    data.append("UID", localStorage.getItem("uid"));
    data.append("TOKEN", localStorage.getItem("token"));
    xhr.open("post", localStorage.getItem("server") + "/api/fative.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText.split(",")[0] == "done") {
                    var list = xhr.responseText.split(",");
                    var all = list.length

                    var now = 1,
                        ret = "";
                    while (now < all) {
                        ret += '<a href="#" class="collection-item" onclick="ati(' + "'" + list[now] + "'" + ')">' + list[now + 1] + '</a>'
                        now += 2;
                    }
                    document.getElementById("list").innerHTML = ret;
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

function ati(ve) { //动画跳转
    sessionStorage.setItem("atid", ve);
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
        init();
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
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