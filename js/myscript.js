//请求黑名单
getBlackList();

function addToBlackList(actor_name) {
    //向后台请求封杀
    chrome.runtime.sendMessage({
        actor: actor_name
    }, function(response) {
        console.log(response);
    });

}

//删除黑名单内的主播、增加删除按钮
function delete_actor(black_list) {
    console.log(black_list);
    console.log(typeof black_list);
    $("#live-list-contentbox li,#live-new-show-content-box li").each(function(i) {
        $(this).append('<a href="javascript:;" style="font-size:18px;background:rgb(255, 67, 81);" class="delete button button-glow button-rounded button-caution">屏蔽</a>');

        for (p in black_list) {
            if (eval("/" + black_list[p] + "/").test($(this).context.innerHTML)) {
                $(this).remove();
            }
        }

    });

    $(".delete").click(function() {
        //获取上一个节点的超链接
        var pre = $(this).prev();

        //取出主播名字
        actor = pre.find("p>span.dy-name").text();

        //加入黑名单
        addToBlackList(actor);

        //移除
        $(this).parent().remove();
        return false;
    });

}

//获取黑名单
function getBlackList() {
    //向后台请求黑名单
    chrome.runtime.sendMessage({
        action: "get_balck_list"
    }, function(response) {
        // console.log(response);
        if (response.black_list != "null") {
            delete_actor(response.black_list.split(','));
        } else {
            delete_actor(response.black_list.split(','));
        }
    });
}

//去除弹幕评论
$('#chat_lines').remove();

console.log('执行完毕。localStorage.douyu_blacklist="' + localStorage.douyu_blacklist + '"');