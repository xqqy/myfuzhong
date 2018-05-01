var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('DeviceReady', this.ready.bind(this), false);

	},
	ready: function () {
		document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
		document.body.style.animation = "showen 0.3s forwards";
	},
	onBackKeyDown: function (e) {
		document.body.addEventListener("animationend", function () {
			if(localStorage.getItem("loged")){
				document.location = "setting.html";
			}else{
				document.location="firstrun.html"
			}
		});
		document.body.style.animation = "hidden 0.3s forwards";
	}
}
app.initialize();