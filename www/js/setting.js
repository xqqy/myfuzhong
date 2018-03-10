function change(op){
    if(localStorage.getItem(op)){
        localStorage.removeItem(op);
    }else{
        localStorage.setItem(op,"true");
    }
}
function loc(ati) { //动画跳转
    document.body.addEventListener("animationend", function () {
        document.location = ati;
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}
function cls(){
    localStorage.clear();
    sessionStorage.clear();
    loc("firstrun.html");
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        if(localStorage.getItem("debug")){
            document.location="debug.html";
        }
    },
    ready: function () {
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        if(localStorage.getItem("worker")){
            document.getElementById("worker").checked=true;
        }
        if(localStorage.getItem("aliyun_oss")){
            document.getElementById("aliyun_oss").checked=true;
        }
            document.getElementById("debug").checked=false;
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