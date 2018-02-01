function back(index) {
	if (index == 1) {
		document.body.addEventListener("animationend", function() {
			document.body.addEventListener("animationend", function() {
                navigator.app.exitApp();
            });
            document.body.style.animation = "hidden 0.3s forwards";
		})
		document.body.style.animation = "hidden 0.3s forwards";
	} else {
		return;
	}
}
var app = {
	// Application Constructor
	initialize: function() {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
    },
    ready: function (){
		document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
		document.body.style.animation = "showen 0.3s forwards";
	},
	onBackKeyDown:function (e) {
		e.preventDefault();
		navigator.notification.confirm("", back, "您是指退出吗？", "是,否")
	}
}
app.initialize();