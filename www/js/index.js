function dialogAlert(message, title, buttonname, callback) { //通知服务
    title = title || "错误";
    buttonname = buttonname || "确定";
    callback = callback || function () {
        return;
    }
    navigator.notification.alert(message, callback, title, buttonname);
}

function loc(ati) { //动画跳转
    document.body.addEventListener("animationend", function () {
        document.location = ati;
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}

function scan(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
     );
}

function reflash() {
    if (!localStorage.getItem("token")) {
        dialogAlert("您没有登录");
        return;
    }
    document.getElementById("loading").style.display = "block";
    M.Tabs.init(document.getElementById("focus")).destroy()
    var req = new XMLHttpRequest;
    var doc = new FormData;
    doc.append("UID", localStorage.getItem("uid"));
    doc.append("TOKEN", localStorage.getItem("token"));
    req.open("post", localStorage.getItem("server") + "/api/reflash.php", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            document.getElementById("loading").style.display = "none";
            if (req.status == 200) {
                if (req.responseText.split(",")[0] == "done") {
                    localStorage.setItem("token", req.responseText.split(",")[1]);
                    localStorage.setItem("name", req.responseText.split(",")[2]);
                    localStorage.setItem("card", req.responseText.split(",")[3]);
                    localStorage.setItem("life", req.responseText.split(",")[4]);
                    localStorage.setItem("cardtime", new Date().getTime());
                    document.getElementById("test-swipe-1").innerHTML = localStorage.getItem("card");
                    document.getElementById("test-swipe-2").innerHTML = localStorage.getItem("life");
                    M.Tabs.init(document.getElementById("focus"), {})
                } else {
                    dialogAlert(req.responseText);
                    document.getElementById("loading").style.display = "none";
                }
            } else {
                dialogAlert("HTTP代码：" + req.status, "网络错误！");
                document.getElementById("loading").style.display = "none";
            }
        }
    }
    req.send(doc);
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        if (!localStorage.getItem("firstrun")) {
            document.location = "firstrun.html";
        }
        if (!localStorage.getItem("loged")) {
            document.location = "login.html";
        }
    },
    ready: function () {
        if (localStorage.getItem("token")) {
            document.getElementById("test-swipe-1").innerHTML = localStorage.getItem("card");
            document.getElementById("test-swipe-2").innerHTML = localStorage.getItem("life");
            M.Tabs.init(document.getElementById("focus"), {})
        } else {
            document.getElementById("test-swipe-1").innerHTML = '<div class="row"><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">登录信息</span><p>你作为游客登录</p></div><div class="card-action"><a href="#"onclick="loc("' + "'" + 'login.html' + "'" + ')">切换用户</a></div></div></div><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">了解附中</span><p>你可以通过下方选项来了解附中</p></div><div class="card-action"><a href="#"onclick="loc(' + "'" + 'history/index.html' + "'" + ')">游览附中</a><a href="#"onclick="loc(' + "'" + 'sphere.html' + "'" + ')">全景导览</a></div></div></div></div>';
            document.getElementById("test-swipe-2").innerHTML = '<div class="row"><div class="row"><div class="col s12 m6"><div class="card"><div class="card-content"><span class="card-title">登录信息</span><p>你没有登录，因而不能查看本部分</p></div><div class="card-action"><a href="#"onclick="loc(' + "'login.html'" + ')">登录</a></div></div></div></div></div>'
        }
        M.FloatingActionButton.init(document.querySelector('.fixed-action-btn'), {
            hoverEnabled: false
        });
        var instance = M.Tabs.init(document.getElementById("slide"), {
            swipeable: true
        });
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.body.style.animation = "showen 0.3s forwards";
    },
    onBackKeyDown: function (e) {
        e.preventDefault();
        document.body.addEventListener("animationend", function () {
            document.location = 'debug.html';
        })
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();