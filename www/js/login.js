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
function jump() { //动画跳转
    localStorage.setItem("loged", "1");
    document.body.addEventListener("animationend", function () {
        document.location = "index.html";
    }); 
    document.body.style.animation = "hidden 0.3s forwards";
}


function login() { //登录
    document.getElementById("loading").style.display="block";
    if (document.getElementById("UID").value == "" || document.getElementById("PSWD").value == "") {
        dialogAlert("登录信息不完整");
        document.getElementById("loading").style.display="none";
        return;
    }
    var req = new XMLHttpRequest;
    var doc = new FormData;
    doc.append("UID", document.getElementById("UID").value);
    doc.append("PSWD", document.getElementById("PSWD").value);
    req.open("post", localStorage.getItem("server") + "/api/login.php", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            document.getElementById("loading").style.display="none";
            if (req.status == 200) {
                if (req.responseText.split(",")[0] == "done") {
                    localStorage.setItem("uid",document.getElementById("UID").value);
                    localStorage.setItem("token", req.responseText.split(",")[1]);
                    localStorage.setItem("name", req.responseText.split(",")[2]);
                    localStorage.setItem("card", req.responseText.split(",")[3]);
                    localStorage.setItem("life", req.responseText.split(",")[4]);
                    localStorage.setItem("cardtime",new Date().getTime())
                    jump();
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
            localStorage.setItem("firstrun", "2.2.2.0B");
            localStorage.setItem("now", "-1");
            localStorage.setItem("server", "http://39.106.99.226")
            document.location = 'firstrun.html';
        }
    },
    ready: function () {
        document.body.style.animation = "showen 0.3s forwards";
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("guest").addEventListener("click", jump);
    },
    onBackKeyDown: function (e) {
        e.preventDefault();
        document.body.addEventListener("animationend", function () {
            document.location = "debug.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();