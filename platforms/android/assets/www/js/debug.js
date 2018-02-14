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
		document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
	},
	onBackKeyDown: function (e) {
		e.preventDefault();
		navigator.notification.confirm("", back, "您是指退出吗？", "是,否")
	}
}
app.initialize();