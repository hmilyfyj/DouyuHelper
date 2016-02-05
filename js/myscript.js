
//请求黑名单
// var arr = getBlackList().black_list.split(",");
getBlackList();

function addToBlackList(actor_name) {
	//向后台请求封杀
	chrome.runtime.sendMessage({actor:actor_name}, function(response) {
	  console.log(response);
	});
	
}

function delete_actor(black_list) {
	console.log(black_list);
	console.log(typeof black_list);
	$("#live-list-contentbox li,#live-new-show-content-box li").each(function(i){
	$(this).append('<a class="delete primary_button01" href="javascript:;"><div style="height:20px;width:40px;font-size:15px;color: #000; height: 24px; font-size: 14px; text-align: center; line-height: 24px; padding-left: 10px; padding-right: 10px; border: 1px solid #d7d7d7; border-radius: 4px; margin-right: 5px;">删除</div></a>');

	for(p in black_list) {
		if (eval("/"+black_list[p]+"/").test($(this).context.innerHTML)) {
			$(this).remove();
		}
	}

	});

	$(".delete").click(function(){
		//获取上一个节点的超链接
		var pre = $(this).prev();

		//取出主播名字
		actor = pre.find("p>span.dy-name").text();

		//加入黑名单
		addToBlackList(actor);
		// localStorage.douyu_blacklist +=",/"+actor+"/";

		// console.log(localStorage.douyu_blacklist);

		//移除
		$(this).parent().remove();
		return false;
	});

}

//获取黑名单
function getBlackList(){
	//向后台请求黑名单
	chrome.runtime.sendMessage({action:"get_balck_list"}, function(response) {
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
console.log('执行完毕。localStorage.douyu_blacklist="'+localStorage.douyu_blacklist+'"');

// //发送消息
// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response);
// });

// //接收消息
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting == "hello")
//     sendResponse({farewell: "goodbye"});
//   });