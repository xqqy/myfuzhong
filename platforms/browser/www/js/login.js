function guest(){//动画跳转
    alert("ss");
    document.body.addEventListener("animationend", function() {
		document.location = "license.html";
	});
	document.body.style.animation = "hidden 0.3s forwards";
}
function login(){//登录
    angular.module('ionicApp', ['ionic'])
	.controller('main', function($scope, $timeout, $ionicLoading) {
	  // Setup the loader
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });
	  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
	  $timeout(function () {
	    $ionicLoading.hide();
	    $scope.stooges = [{name: 'Moe'}, {name: 'Larry'}, {name: 'Curly'}];
	  }, 20000);
    });
    var req=new XMLHttpRequest;
    var doc=new FormData;
    doc.append("UID",document.getElementById("UID").value);
    doc.append("PSWD",document.getElementById("PSWD").value);
    req.open("post",localStorage.getItem("server")+"/api/login.php",true);
    req.onreadystatechange=function() {
        if(req.readyState==4){
            if(req.status==200){
                if(req.responseText.split(",")[0]=="done"){
                    alert("成功");
                }else{
                    alert(req.responseText)
                }
            }else{
                alert("网络错误！"+req.status)
            }
        }
    }
    req.onerror=function() {alert("系统错误！(req.onerror)")}
    req.send(doc);
}

var app = {
	// Application Constructor
	initialize: function() {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        if (!localStorage.getItem("firstrun")) {
			localStorage.setItem("firstrun", "2.1.2.2B");
            localStorage.setItem("now", "-1");
            localStorage.setItem("server","http://39.106.99.226")
			document.location = 'firstrun.html';
        }
    },
    ready: function (){
        document.body.style.animation = "showen 0.3s forwards";
        document.getElementById("login").addEventListener("click", login);
        document.getElementById("guest").addEventListener("click", guest);
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
	},
	onBackKeyDown:function (e) {
		e.preventDefault();
		document.body.addEventListener("animationend", function() {
			document.location = "debug.html";
		});
		document.body.style.animation = "hidden 0.3s forwards";
	}
}
app.initialize();