function timelineRequest(e,n,t,i,s){var l=API_URL_ROOT+"v1/"+(null!=t?"shared/":"user/")+"pins/"+e.id,o=new XMLHttpRequest;o.onload=function(){console.log("timeline: response received: "+this.responseText),s(this.responseText)},o.open(n,l),o.setRequestHeader("Content-Type","application/json"),null!=t&&(o.setRequestHeader("X-Pin-Topics",""+t.join(",")),o.setRequestHeader("X-API-Key",""+i)),Pebble.getTimelineToken(function(n){o.setRequestHeader("X-User-Token",""+n),o.send(JSON.stringify(e)),console.log("timeline: request sent.")},function(e){console.log("timeline: error getting timeline token: "+e)})}function insertUserPin(e,n){timelineRequest(e,"PUT",null,null,n)}function deleteUserPin(e,n){timelineRequest(e,"DELETE",null,null,n)}function insertSharedPin(e,n,t,i){timelineRequest(e,"PUT",n,t,i)}function deleteSharedPin(e,n,t,i){timelineRequest(e,"DELETE",n,t,i)}var API_URL_ROOT="https://timeline-api.getpebble.com/";

Pebble.addEventListener('ready', function() {
  console.log('ready');
  witRequest('remind me to study tomorrow');
});

function witRequest(query) {
  var now = new Date();
  var context = {
    "reference_time": now.toISOString()
  }
  var url = 'https://api.wit.ai/message?v=20141022&context=' + encodeURIComponent(JSON.stringify(context)) + '&q=' + encodeURIComponent(query);

  var request = new XMLHttpRequest();
  request.onload = function() {
    if (request.status == 200) {
      witResponse(this.responseText);
    } else {
      // error
    }
  }
  request.open('GET', url);
  request.setRequestHeader('Authorization', 'Bearer 3ZEWA2PKFV7ZH57NXAIQ5AVIIK72IBQG');
  request.send(null);
}

function witResponse(response) {
  var outcome = JSON.parse(response).outcomes[0];
  if (outcome.intent == 'remind') {
    var entities = outcome.entities;

    var reminder = entities.reminder[0].value;
    reminder = reminder.charAt(0).toUpperCase() + reminder.slice(1);

    var tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    var time = tomorrow.toISOString();
    if (entities.hasOwnProperty('datetime')) {
      time = entities.datetime[0].value;
    }

    var pin = {
      "id": "pin-" + Math.round((Math.random() * 100000)),
      "time": time,
      "layout": {
        "type": "genericPin",
        "title": reminder,
        "tinyIcon": "system://images/NOTIFICATION_FLAG"
      }
    }
    console.log('inserting pin: ' + JSON.stringify(pin));
    insertUserPin(pin, function(response) {
      // success?
    });
  } else {
    // error
  }
}
