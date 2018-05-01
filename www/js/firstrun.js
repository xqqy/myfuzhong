function jump() { //动画跳转
  localStorage.setItem("loged", "1");
  document.body.addEventListener("animationend", function () {
      document.location = "login.html";
  });
  document.body.style.animation = "hidden 0.3s forwards";
}
function back(index) {
	if (index == 1) {
				navigator.app.exitApp();
	} else {
		return;
	}
}
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('DeviceReady', this.ready.bind(this), false);
  },
  ready: function () {
    document.body.style.animation = "showen 0.3s forwards";
    document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
    if (!localStorage.getItem("firstrun")) {
      localStorage.setItem("firstrun", "2.3.4.0");
      localStorage.setItem("now", "-1");
      localStorage.setItem("worker", "true");
      localStorage.setItem("server", "https://xqqy11.top")
      localStorage.setItem("flash", "true");
      localStorage.setItem("yun", "https://myfuzhong-1256504649.cos-website.ap-beijing.myqcloud.com");
    }
    document.getElementById("start").addEventListener("click",jump)
  },
  onBackKeyDown: function (e) {
    e.preventDefault();
navigator.notification.confirm("", back, "您是指退出吗？", "是,否")
}
}
app.initialize();