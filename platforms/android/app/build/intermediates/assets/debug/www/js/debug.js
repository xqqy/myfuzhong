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
			document.location = "index.html";
	}
}
app.initialize();