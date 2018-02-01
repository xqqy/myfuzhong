angular.module('ionicApp', ['ionic'])
  .controller('SlideController', function ($scope) {
    $scope.myActiveSlide = 0;
  })

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('DeviceReady', this.ready.bind(this), false);
    document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
    document.getElementById("license").addEventListener("click", license);
  },
  ready: function () {
    document.body.style.animation = "showen 0.3s forwards";
    if (!localStorage.getItem("firstrun")) {
      localStorage.setItem("firstrun", "2.1.2.0B");
      localStorage.setItem("now", "-1")
      dialogAlert("欢迎", "这是您第一次使用这个APP，请阅读我们的使用说明和授权文件!");
      document.location = '../about.html';
    }
  },
  onBackKeyDown: function (e) {
    e.preventDefault();
    document.location="debug.html"
  }
}
app.initialize();