function xhr(){
    var data=new FormData;
    data.append("ATID",sessionStorage.getItem("ative"));
    var xhr=new XMLHttpRequest;
    xhr.open("post",localStorage.getItem("server")+"/api/ative.php",true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                if(xhr.responseText.split(",")[0]=="done"){
                    if(xhr.responseText.split(",")[1]=="script"){
                        document.getElementById("iframe").sandbox="allow-scripts allow-forms allow-modals";
                        document.getElementById("iframe").srcdoc=xhr.responseText.split(",")[2];
                    }else{
                        document.getElementById("iframe").srcdoc=xhr.responseText.split(",")[2];
                    }
                }else{
                    dialogAlert(xhr.response);
                }
            }else{
                dialogAlert("网络错误，HTTP代码："+xhr.status);
            }
        }
    }
    xhr.send();
}
function dialogAlert(message, title, buttonname, callback) { //通知服务
    title = title || "错误";
    buttonname = buttonname || "确定";
    callback = callback || function () {
        return;
    }
    navigator.notification.alert(message, callback, title, buttonname);
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        xhr();
    },
    ready: function () {
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("iframe").style.height=window.innerHeight-64+"px";
        document.body.style.animation = "showen 0.3s forwards";
    },
    onBackKeyDown: function (e) {
        document.body.addEventListener("animationend", function () {
            document.location = "about.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();