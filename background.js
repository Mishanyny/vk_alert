var token = '3f752155f00573e7d7fe57ba16ed8ea173961b20f418f77ed8864f8c310d04da8ba6a52ab70ed81adbc8d';
var senders = ''

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      sendResponse({res: senders});
      senders = '';
  });



function process (server, data){

    var updates = data['updates'];
    
    

    if(updates){
        for(var i = 0; i<updates.length; i++){

            if(updates[i][0]==4){

                var message_flag = updates[0][2];

                if(!(message_flag & 2)){
                    var user_id = updates[0][3];
                    $.ajax({
                    url:'https://api.vk.com/method/users.get',
                    data:{'user_ids':Number(user_id), 'name_case':'gen', 'access_token': token, 'v' : '2.0'},
                    success: function(data, user_id){
                                            var text = updates[0][5]
                                            var id = data['response'][0]['uid']
                                            var f_name = data['response'][0]['first_name']
                                            var l_name = data['response'][0]['last_name']
                                            chrome.browserAction.setBadgeBackgroundColor({color: "red"});
                                            chrome.browserAction.setBadgeText({text: "!!!"});
                                            senders += ("<tr id='"+id+"'><td>Сообщение от "+f_name+" "+l_name+" : "+text+"</td></tr>")
                                            console.log("Сообщение от "+f_name+" "+l_name+" : "+text)}
                    });
                }
                    
            }
                
   
        }
        
    }

    upd (server);
    

}

function upd (server){

    var response = ''
        $.ajax({
        url:'https://'+server['server']+'?act=a_check&key='+server["key"]+'&ts='+server["ts"]+'&wait=20&mode=2&version=2',
        data:{'access_token': token},
        success: function(data){
                                server['ts'] = data['ts']
                                process(server, data)}
        });

}


$(document).ready(function () {

    $.ajax({
        url:'https://api.vk.com/method/messages.getLongPollServer',
        data:{'access_token': token, 'v' : '2.0'},
        success: function(data){var server = data['response']
                                upd(server)}
    });


});
    
