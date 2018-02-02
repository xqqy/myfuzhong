var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        if (!localStorage.getItem("firstrun")) {
            document.location = "firstrun.html";
        }
        if (!localStorage.getItem("loged")) {
            document.location = "login.html";
        }
    },
    ready: function () {
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.body.style.animation = "showen 0.3s forwards";
    },
    onBackKeyDown: function (e) {
		e.preventDefault();
		document.body.addEventListener("animationend", function () {
			document.location = 'debug.html';
		})
		document.body.style.animation = "hidden 0.3s forwards";
	}
}
app.initialize();
angular.module('myapp', ['ionic'])
    .controller('Controller', function ($scope, $ionicSlideBoxDelegate) {
        var a = "tab-item active",
            d = "tab-item"
        $scope.tab0 = a;
        $scope.tab1 = d;
        $scope.tab2 = d;
        $scope.tab3 = d;
        $scope.pge = function (index) {
            $scope.apage = index;
        }
        $scope.nextSlide = function (index) {
            switch (index) {
                case 0:
                    $scope.tab0 = a;
                    $scope.tab1 = d;
                    $scope.tab2 = d;
                    $scope.tab3 = d;
                    break;
                case 1:
                    $scope.tab0 = d;
                    $scope.tab1 = a;
                    $scope.tab2 = d;
                    $scope.tab3 = d;
                    break;
                case 2:
                    $scope.tab0 = d;
                    $scope.tab1 = d;
                    $scope.tab2 = a;
                    $scope.tab3 = d;
                    break;
                case 3:
                    $scope.tab0 = d;
                    $scope.tab1 = d;
                    $scope.tab2 = d;
                    $scope.tab3 = a;
                    break;
            }
        }
    })