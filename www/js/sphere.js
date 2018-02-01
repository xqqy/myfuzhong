function loadimg(){
    var div = document.getElementById('container');
    var PSV = new PhotoSphereViewer({
        // 全景图的完整路径
        panorama: "img/sphere/1.jpg",

        // 放全景图的元素
        container: div,

        // 可选，默认值为2000，全景图在time_anim毫秒后会自动进行动画。（设置为false禁用它）
        time_anim: false,

        // 可选值，默认为false。显示导航条。
        navbar: false,

        // 可选，默认值null，全景图容器的最终尺寸。例如：{width: 500, height: 300}。
        size: {
            width: '100%',
            height: parseFloat(window.innerHeight)+'px'//让全景图刚好撑满屏幕
        },
        loading_msg:"",
        onready:imgready
    });
}
function imgready(){
    document.getElementById("txt").style.display="none";
    document.getElementById("txt").style.height="1px";
    document.getElementById("txt").style.width="1px";
    document.getElementById("main").style.animation = "showen 0.6s forwards";
}

var app = {
	// Application Constructor
	initialize: function() {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
    },
    ready: function() {
        localStorage.setItem("sphere","img/sphere/1.jpg")
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        loadimg();
        document.getElementById("txt").style.animation="showen 0.3s forwards";
    },
    onBackKeyDown:function (e) {
        document.body.addEventListener("animationend", function() {
            document.location = "index.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();