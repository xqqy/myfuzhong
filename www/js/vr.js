var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this));
    },
    ready: function () {
        document.body.style.animation = "showen 0.3s forwards";
        if(localStorage.getItem("flash")){
            document.addEventListener("backbutton", app.onBackKeyDown.bind(this));
        }
    },
    onBackKeyDown: function (e) {
        document.body.addEventListener("animationend", function () {
            document.location = "search.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();