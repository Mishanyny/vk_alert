var token = 'f92e9a5e1a2a957441d81176e13c13b35eecb4649fca535bf035de616558471e773b032760be8577aed4c';
var views = chrome.extension.getViews({
    type: "popup"
});


function process (server, data){

    var updates = data['updates']

    if(updates){
        for(var i = 0; i<updates.length; i++){

            if(updates[0][0]==4){

                var message_flag = updates[0][2]

                if(!(message_flag & 2)){
                    var user_id = updates[0][3]
                    
                    $.ajax({
                    url:'https://api.vk.com/method/users.get',
                    data:{'user_ids':Number(user_id), 'name_case':'gen', 'access_token': token, 'v' : '2.0'},
                    success: function(data, user_id){text = updates[0][5]
                                            $(".body").append("<div id='"+user_id+"'>Сообщение от "+data['response'][0]['first_name']+" : "+text+"</div>")
                                            console.log("Сообщение от "+data['response'][0]['first_name']+" : "+text)}
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
        success: function(data){response = data; 
                                server['ts'] = response['ts']
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
    
