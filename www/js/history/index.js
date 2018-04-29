//全局变量
var time = 31;
var clss=0;
//地理服务倒计时

function dtme() {
	time -= 1;
	document.getElementById("dtme").innerHTML = "定位中" + time;
	console.log(time);
	if (time > 0) {
		setTimeout("dtme()", 1000);
	}
	return;
}
function cls(va){
	clss=va;
}

//地理服务

function getPosition() {
	var options = {
		enableHighAccuracy: true,
		timeout: 30000,
		maximumage: 60000
	}
	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	function onSuccess(position) {
		app.done();
		navigator.geolocation.clearWatch(watchID);
		console.log("位置信息：" + '\n' + '纬度: ' + position.coords.latitude + '\n' + '经度: ' + position.coords.longitude + '\n' + '获取时间戳: ' + position.timestamp + '\n');
		return;
	};

	function onError(error) {

		console.log('code:' + error.code + '\n' + 'info:' + error.message)
		switch (error.code) {
			case 1:
				dialogAlert("你必须开启位置服务才能使用本应用！游戏将退出", "错误", "确定", app.onBackKeyDown);
				break;
			case 2:
				dialogAlert("应用内部错误！提示信息:" + error.message, "错误", "确定", app.onBackKeyDown);
				break;
			case 3:
				dialogAlert("获取地理位置超时！请在空阔地带使用并启动辅助定位", "错误", "确定", app.onBackKeyDown);
				break;
			default:
				dialogAlert('地理位置服务错误！代码: ' + error.code + '\n' + '默认错误帮助: ' + error.message + '\n', "错误", "确定", app.onBackKeyDown);
		}
		return;
	}
}

//通知服务

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
//开始动画

function game() {
	var g = parseInt(clss);
	if (parseInt(localStorage.getItem("now")) + 1 < g) {
		dialogAlert("该章节尚未解锁");
		return;
	}
	sessionStorage.setItem("game", g);
	document.body.addEventListener("animationend", function () {
		document.location = "game.html";
	});
	document.body.style.animation = "hidden 0.5s forwards";
}

var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('DeviceReady', this.ready.bind(this), false);
		document.body.style.animation = "showen 0.3s forwards"
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.

	// Update DOM on a Received Event
	ready: function () {
		M.Dropdown.init(document.querySelector('.dropdown-trigger'),{})
		document.getElementById("game").addEventListener("click", game);
		document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
		this.hidd("ative0");
		this.show("ative1");
		console.log('cordova加载完成');
		getPosition();
		dtme();
	},

	done: function () {
		document.getElementById("h1").innerHTML = "漫游附中小游戏";
		this.hidd("ative1");
		this.show("ative2");
	},
	onBackKeyDown: function (e) {
		if(e){
			e.preventDefault();}
		document.body.addEventListener("animationend", function () {
			document.location = '../index.html';
		})
		document.body.style.animation = "hidden 0.3s forwards";
	},
	hidd: function (clsas) {
		var clsss = document.getElementsByClassName(clsas)
		var long = clsss.length;
		var now = 0;
		while (now < long) {
			clsss[now].style.display = "none"
			now += 1
		}
		return;
	},

	show: function (clsas) {
		var clsss = document.getElementsByClassName(clsas)
		var long = clsss.length;
		var now = 0;
		while (now < long) {
			clsss[now].style.display = "block"
			now += 1
		}
		return;
	}


};

app.initialize();