function jump() { //动画跳转
  localStorage.setItem("loged", "1");
  document.body.addEventListener("animationend", function () {
      document.location = "login.html";
  });
  document.body.style.animation = "hidden 0.3s forwards";
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
      localStorage.setItem("firstrun", "2.3.0.2");
      localStorage.setItem("now", "-1");
      localStorage.setItem("worker", "true");
      localStorage.setItem("server", "http://39.106.99.226")
    }
    document.getElementById("start").addEventListener("click",jump)
  },
  onBackKeyDown: function (e) {
    e.preventDefault();
    document.location = "debug.html"
  }
}
app.initialize();