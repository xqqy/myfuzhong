function license() {
	document.body.addEventListener("animationend", function () {
		document.location = "license.html";
	});
	document.body.style.animation = "hidden 0.3s forwards";
}

var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('DeviceReady', this.ready.bind(this), false);

	},
	ready: function () {
		document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
		document.getElementById("license").addEventListener("click", license);
		document.getElementById("back").addEventListener("click", this.onBackKeyDown.bind(this));
		document.body.style.animation = "showen 0.3s forwards";
	},
	onBackKeyDown: function (e) {
		e.preventDefault();
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