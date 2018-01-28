function onBackKeyDown(e) {
	document.body.addEventListener("animationend", function() {
		document.location = "game.html";
	});
	document.body.style.animation = "hidden 0.5s forwards";
}
document.addEventListener("backbutton", onBackKeyDown, false);
var app = {
	// Application Constructor
	initialize: function() {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        document.addEventListener("backbutton", onBackKeyDown, false);
    },
    ready: function (){
        document.body.style.animation = "showen 0.3s forwards";
    }
}
app.initialize;