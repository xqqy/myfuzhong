function onBackKeyDown(e) {
	document.body.addEventListener("animationend", function() {
		document.location = "index.html";
	});
	document.body.style.animation = "hidden 0.3s forwards";
}
function license(){
    document.body.addEventListener("animationend", function() {
		document.location = "license.html";
	});
	document.body.style.animation = "hidden 0.3s forwards";
}
document.addEventListener("backbutton", onBackKeyDown, false);
var app = {
	// Application Constructor
	initialize: function() {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        document.addEventListener("backbutton", onBackKeyDown, false);
        document.getElementById("license").addEventListener("click", license);
    },
    ready: function (){
        document.body.style.animation = "showen 0.3s forwards";
    }
}
app.initialize();