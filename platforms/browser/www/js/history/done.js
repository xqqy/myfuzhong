//退出
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(e){
    document.body.addEventListener("animationend",function(){document.location='index.html';})
    document.body.style.animation="hidden 0.3s forwards";
}
    //通知服务
    function dialogAlert(title="错误",message,buttonname="确定",callback=function(){return;}) {
        navigator.notification.alert(message,callback,title,buttonname);
         
     }

     document.body.style.animation="showen 0.3s forwards"