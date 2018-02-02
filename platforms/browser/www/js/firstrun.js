angular.module('ionicApp', ['ionic'])
  .controller('SlideController', function ($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function (index) {
      if (index > 2) {
        document.location = "login.html";
      }
    }
  })

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('DeviceReady', this.ready.bind(this), false);
  },
  ready: function () {
    document.body.style.animation = "showen 0.3s forwards";
    document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
    if (!localStorage.getItem("firstrun")) {
      localStorage.setItem("firstrun", "2.2.0.0B");
      localStorage.setItem("now", "-1");
      localStorage.setItem("server", "http://39.106.99.226")
    }
  },
  onBackKeyDown: function (e) {
    e.preventDefault();
    document.location = "debug.html"
  }
}
app.initialize();