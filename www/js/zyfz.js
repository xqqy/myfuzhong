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

class getPosition  {
    constructor(latitude, longitude) {
        this.latitude=latitude;
        this.longitude=longitude;
        this.options ={
            enableHighAccuracy: true,
            timeout: 30000,
            maximumage: 0
        };
        this.watchID = navigator.geolocation.watchPosition(this.onSuccess.bind(this), this.onError.bind(this),this.options);
    };
    onSuccess (position) {

        console.log("位置信息：" + '\n' + '纬度: ' + position.coords.latitude + '\n' + '经度: ' + position.coords.longitude + '\n' + '获取时间戳: ' + position.timestamp + '目标纬度' + this.latitude + '目标经度' + this.longitude);

        if (this.latitude - 0.0001 < position.coords.latitude && this.longitude + 0.0001 > position.coords.latitude && this.longitude - 0.0001 < position.coords.longitude && this.longitude + 0.0001 > position.coords.longitude) {
            var data = new FormData();
            data.append("UID", localStorage.getItem("uid"));
            data.append("TOKEN", localStorage.getItem("token"));
            data.append("ATID", sessionStorage.getItem("atid"));
            var xhr = new XMLHttpRequest();
            xhr.open("post", localStorage.getItem("server") + "/api/gatived.php");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        if (xhr.responseText == "done") {
                           /*dialogAlert("您已成功验证", "成功", "好", () => {
                                loc("index.html");
                            });*/
                            alert("您已完成验证");
                            loc("index.html");
                        } else {
                            alert(xhr.responseText);
                        }
                    } else {
                        alert("网络错误，HTTP代码:" + xhr.status);
                    }
                }
            }
            xhr.send(data);
        }
        return;
    };
    onError (error) {

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
    };
    clear(){
        navigator.geolocation.clearWatch(this.watchID);
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
                    geo=new getPosition(parseFloat(xhr.responseText.split("/meow/")[1]), parseFloat(xhr.responseText.split("/meow/")[2]));
                    document.getElementById("map").addEventListener("click", () => {
                        document.location = " http://apis.map.qq.com/tools/routeplan/eword=目标地点&epointx=" + xhr.responseText.split("/meow/")[2] + "&epointy=" + xhr.responseText.split("/meow/")[1] + "?referer=MyFuzhong&key=INFBZ-V5K3F-OOYJK-JKIG7-D2GUK-WRBQW"
                    });
                } else {
                    dialogAlert(xhr.responseText);
                }
            } else {
                dialogAlert("网络错误，HTTP代码:" + xhr.status);
            }
        }
    }
    xhr.send(data);
    sessionStorage.setItem("sphere", "AT" + sessionStorage.getItem("atid"));
    document.getElementById("iframe").src = "sphere.html"
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);

    },
    ready: function () {
        if(localStorage.getItem("flash")){
            document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        }
        document.getElementById("iframe").style.height = window.innerHeight - 181 + "px";
        document.body.style.animation = "showen 0.3s forwards";

        var help = M.Modal.init(document.getElementById("help"), {});
        help.open();
        var errors = M.Modal.init(document.getElementById("errors"), {});
        document.getElementById("helper").addEventListener("click", function () {
            help.open()
        }.bind(this));
        document.getElementById("errorer").addEventListener("click", function () {
            errors.open()
        }.bind(this))
        init()
    },
    onBackKeyDown: function () {
        document.body.addEventListener("animationend", function () {
            document.location = "search.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();