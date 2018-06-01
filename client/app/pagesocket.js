/**
 * Created by lysakm on 5/27/18.
 */
function Packet(eventname,payload,channel) {
    this.eventname=  eventname;
    this.payload = payload;
    this.channel = channel;
}
var channel = 0;
function setCookie(cname, cvalue, exdays=1, willexpire=true) {
    var expires = "";
    if(willexpire){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "expires="+d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookieValue(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        c = c.trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setUser() {
    var cvalue = getCookieValue("audienceid");
    if (cvalue != "") {
        //alert("Welcome again " + cvalue);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("audienceid", user, 365);
        }
    }
}

function setSession() {
    var cvalue = getCookieValue("sessionid");
    if (cvalue != "") {
        //alert("session id already set as " + sessionid)
    } else {
        setCookie("sessionid","MAKEMEAREALUUID",1,false)
    }
}

function setPageView() {
    var cvalue = getCookieValue("pageviewid");
    if (cvalue != "") {
        var i = getCookieValue("pageviewid");
        setCookie("pageviewid",++i)
    } else {
        setCookie("pageviewid",1)
    }
}

function runCookies() {
    setUser();
    setSession();
    setPageView();
}

function alertCookies(){
    var a = getCookieValue("audienceid");
    var s = getCookieValue("sessionid");
    var p = getCookieValue("pageviewid");
    alert("audeince id: "+ a + "\n" + "sessionid: " + s + "\n" + "pageviewid: " + p);
    connectWebsocket(a,s,p);

}

function connectWebsocket(a,s,p){
    var socket = new WebSocket('ws://localhost:3001/');
    channel++;

    socket.onopen = function(event) {
        alert('Well we opened the connection');
        //Why use websocket to just send cookies anyway? meh idk.....leave me alone
        var thisPacket = new Packet(
            'WorldEvent',
            {
                audienceId: a,
                sessionId: s,
                pageviewId: p
            },
            channel
        );
        socket.send(JSON.stringify(thisPacket));

        //socket.close();
    };
    socket.onclose = function close(){
        alert('closing websocket');
        console.log('connection closed');
    };
    socket.onmessage = function processMessage(message){
        try{
            var parsedJson =  JSON.parse(message.data);
            if(parsedJson.hasOwnProperty('Hello')){
                document.body.innerHTML += parsedJson.Hello;
            }
        }catch(e){
            console.log('wasnt json, silly mortal. wtf kind of feeds u giving us here');
        }
    }
}
