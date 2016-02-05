function renderStatus(statusText) {
    document.getElementById('message').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
    //获取黑名单
    var blacklist = localStorage.douyu_blacklist;
    console.log(blacklist);
    if (!blacklist) {
        renderStatus("你还没添加任何主播");
    } else {
        renderStatus("");
        blacklist = blacklist.split(',');
        for (p in blacklist) {
            addItem(blacklist[p]);
        }
    }

});

function addItem(message) {
    $("#actots").append("<li>" + message + "</li>");
}
