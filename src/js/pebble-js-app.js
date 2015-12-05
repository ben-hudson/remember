// timeline API
function timelineRequest(e,n,t,i,s){var l=API_URL_ROOT+"v1/"+(null!=t?"shared/":"user/")+"pins/"+e.id,o=new XMLHttpRequest;o.onload=function(){console.log("timeline: response received: "+this.responseText),s(this.responseText)},o.open(n,l),o.setRequestHeader("Content-Type","application/json"),null!=t&&(o.setRequestHeader("X-Pin-Topics",""+t.join(",")),o.setRequestHeader("X-API-Key",""+i)),Pebble.getTimelineToken(function(n){o.setRequestHeader("X-User-Token",""+n),o.send(JSON.stringify(e)),console.log("timeline: request sent.")},function(e){console.log("timeline: error getting timeline token: "+e)})}function insertUserPin(e,n){timelineRequest(e,"PUT",null,null,n)}function deleteUserPin(e,n){timelineRequest(e,"DELETE",null,null,n)}function insertSharedPin(e,n,t,i){timelineRequest(e,"PUT",n,t,i)}function deleteSharedPin(e,n,t,i){timelineRequest(e,"DELETE",n,t,i)}var API_URL_ROOT="https://timeline-api.getpebble.com/";

Pebble.addEventListener('ready', function() {
  console.log('ready');
});
