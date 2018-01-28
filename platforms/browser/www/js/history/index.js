//全局变量
var time = 31;
//退出
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
	e.preventDefault();
	document.location="/index.html"
}

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
		console.log("位置信息：" + '\n' + '纬度: ' + position.coords.latitude + '\n' + '经度: ' + position.coords.longitude + '\n' + '获取时间戳: ' + position.timestamp + '\n');
		return;
	};

	function onError(error) {

		console.log('code:' + error.code + '\n' + 'info:' + error.message)
		switch (error.code) {
		case 1:
			dialogAlert("错误", "你必须开启位置服务才能使用本应用！应用将退出", "确定", navigator.app.exitApp);
			break;
		case 2:
			dialogAlert("错误", "应用内部错误！提示信息:" + error.message, "确定", navigator.app.exitApp);
			break;
		case 3:
			dialogAlert("错误", "获取地理位置超时！请在空阔地带使用并启动辅助定位", "确定", navigator.app.exitApp);
			break;
		default:
			dialogAlert("错误", '地理位置服务错误！代码: ' + error.code + '\n' + '默认错误帮助: ' + error.message + '\n', "确定", navigator.app.exitApp);
		}
		return;
	}
}

//通知服务

function dialogAlert(title = "错误", message, buttonname = "确定", callback = function() {
	return;
}) {
	navigator.notification.alert(message, callback, title, buttonname);

}

//开始动画

function game() {
	var g = parseInt(document.getElementById("select").value);
	if (parseInt(localStorage.getItem("now"))+1 < g) {
		dialogAlert("错误", "该章节尚未解锁");
		return;
	}
	localStorage.setItem("game",g);
	document.body.addEventListener("animationend", function() {
		document.location = "game.html";
	});
	document.body.style.animation = "hidden 0.5s forwards"
}

var app = {
	// Application Constructor
	initialize: function() {
		document.addEventListener('DeviceReady', this.ready.bind(this), false);
		document.getElementById("game").addEventListener("click", game)
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.

	// Update DOM on a Received Event
	ready: function() {
		document.body.style.animation = "showen 0.3s forwards"
		this.hidd("ative0");
		this.show("ative1");
		console.log('cordova加载完成');
		getPosition();
		dtme();
		if (!localStorage.getItem("firstrun")) {
			localStorage.setItem("firstrun", "2.0.0.0");
			localStorage.setItem("now", "-1")
			dialogAlert("欢迎", "这是您第一次使用这个APP，请阅读我们的使用说明和授权文件!");
			document.location = '../about.html';
		}
	},

	hidd: function(clsas) {
		var clsss = document.getElementsByClassName(clsas)
		var long = clsss.length;
		var now = 0;
		while (now < long) {
			clsss[now].style.display = "none"
			now += 1
		}
		return;
	},

	show: function(clsas) {
		var clsss = document.getElementsByClassName(clsas)
		var long = clsss.length;
		var now = 0;
		while (now < long) {
			clsss[now].style.display = "block"
			now += 1
		}
		return;
	},
	done: function() {
		document.getElementById("h1").innerHTML = "游览附中";
		this.hidd("ative1");
		this.show("ative2");
	}



};

app.initialize();