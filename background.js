//接收消息
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.actor) {
            //加入黑名单
            localStorage.douyu_blacklist = localStorage.douyu_blacklist ? localStorage.douyu_blacklist + ',' + request.actor : request.actor;
            response = request;
        } else if (request.action == 'get_balck_list') {
            //返回黑名单
            if (localStorage.douyu_blacklist) {
                response = {
                    black_list: localStorage.douyu_blacklist
                };
            } else {
                response = {
                    black_list: "null"
                };
            }
        }
        sendResponse(response);
    });
