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

function loc(ati) { //动画跳转
    document.body.addEventListener("animationend", function () {
        document.location = ati;
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}

function getPosition(latitude, longitude) {
    var options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumage: 0
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    function onSuccess(position) {
        console.log("位置信息：" + '\n' + '纬度: ' + position.coords.latitude + '\n' + '经度: ' + position.coords.longitude + '\n' + '获取时间戳: ' + position.timestamp);

        if (latitude - 0.0001 < position.coords.latitude && longitude + 0.0001 > position.coords.latitude && longitude - 0.0001 < position.coords.longitude && longitude + 0.0001 > position.coords.longitude) {
            var data = new FormData();
            data.append("UID", localStorage.getItem("uid"));
            data.append("TOKEN", localStorage.getItem("token"));
            data.append("ATID", sessionStorage.getItem("atid"));
            var xhr = new XMLHttpRequest();
            xhr.open("post", localStorage.getItem("server") + "/api/gatived.php");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == "200") {
                        if (xhr.responseText.split("/meow/")[0] == "done") {
                            dialogAlert("您已成功验证");
                            loc("index.html");
                        } else {
                            dialogAlert(xhr.responseText);
                        }
                    } else {
                        dialogAlert("网络错误，HTTP代码:" + xhr.status);
                    }
                }
            }
            xhr.send(data);
        }
        return;
    };

    function onError(error) {

        console.log('code:' + error.code + '\n' + 'info:' + error.message)
        switch (error.code) {
            case 1:
                dialogAlert("你必须开启位置服务才能使用本应用！应用将退出", "错误", "确定", navigator.app.exitApp);
                break;
            case 2:
                dialogAlert("应用内部错误！提示信息:" + error.message, "错误", "确定", navigator.app.exitApp);
                break;
            case 3:
                dialogAlert("获取地理位置超时！位置更新可能不准确", "错误", "确定");
                break;
            default:
                dialogAlert('地理位置服务错误！代码: ' + error.code + '\n' + '默认错误帮助: ' + error.message + '\n', "错误", "确定", navigator.app.exitApp);
        }
        return;
    }
}

function init() {
    var data = new FormData();
    data.append("UID", localStorage.getItem("uid"));
    data.append("TOKEN", localStorage.getItem("token"));
    data.append("ATID", sessionStorage.getItem("atid"));
    var xhr = new XMLHttpRequest();
    xhr.open("post", localStorage.getItem("server") + "/api/gative.php");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == "200") {
                if (xhr.responseText.split("/meow/")[0] == "done") {
                    getPosition(xhr.responseText.split("/meow/")[1], xhr.responseText.split("/meow/")[2])
                } else {
                    dialogAlert(xhr.responseText);
                }
            } else {
                dialogAlert("网络错误，HTTP代码:" + xhr.status);
            }
        }
    }
    xhr.send(data);
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);

    },
    ready: function () {
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("iframe").style.height = window.innerHeight - 181 + "px";
        document.body.style.animation = "showen 0.3s forwards";
        init()
    },
    onBackKeyDown: function (e) {
        document.body.addEventListener("animationend", function () {
            document.location = "index.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();