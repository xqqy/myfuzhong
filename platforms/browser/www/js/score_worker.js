var list,all;

function dialogAlert(message, title, buttonname, callback) { //通知服务
    title = title || "错误";
    buttonname = buttonname || "确定";
    callback = callback || function () {
        return;
    }
    if(navigator.notification){
        navigator.notification.alert(message, callback, title, buttonname);
    }else{
        alert(message);
    }
}
function get(e) {//获取列表
    var data=new FormData;
    data.append("UID",e.data[2]);
    data.append("TOKEN",e.data[3]);
    var xhr = new XMLHttpRequest;
    xhr.open("post", e.data[1] + "/api/exam.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText.split(",")[0] == "done") {
                    list = xhr.responseText.split(",");
                    all = list.length
                    onmsg(e)
                } else {
                    dialogAlert(xhr.responseText);
                    close();
                }
            } else {
                dialogAlert("网络不能连接") + xhr.status;
                close();
            }
        }
    }
    xhr.send(data);
}
onmessage = onmsg;
function onmsg(e) {
    if(!list){
        get(e);
        return;
    }
    var now = 1,
        ret = "";
    while (now < all) {
        if (list[now+1].toUpperCase().indexOf(e.data[0].toUpperCase()) > -1) {
            ret+='<a href="#" class="collection-item" onclick="ati('+"'"+list[now]+"'"+')">'+list[now+1]+'</a>'
        }
        now += 2;
    }
    postMessage(ret);
};