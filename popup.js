chrome.browserAction.setBadgeText({text: ""});

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  $(".table").append(response.res);
});


var body = document.getElementsByClassName('body')[0];

body.onclick = function(event) {
    var target = event.target;
    $("#"+target.id).append("<textarea></textarea>")
    console.log(target.id)

}
