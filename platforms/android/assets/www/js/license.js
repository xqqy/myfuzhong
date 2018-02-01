

var app = {
	// Application Constructor
	initialize: function() {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
    },
    ready: function (){
        document.body.style.animation = "showen 0.3s forwards";
    },
    onBackKeyDown:function (e) {
        document.body.addEventListener("animationend", function() {
            document.location = "about.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();