//getting stuff I need
const express = require('express');
const path = require('path');
const events = require('events');
const fs = require('fs');
const http = require("http");
const url = require("url");
const uuidv4 = require('uuid/v4');


function setCookie(cname, cvalue, path = '/' ,willexpire=true, exdays=1,) {
    var expires = "";
    if(willexpire){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "expires="+d.toUTCString();
    }
    return cname + "=" + cvalue + ";" + expires + ";path=" + path;
}

function bakeCookies(request){
    var finalCookieObject = {};
    cookies = request.headers.cookie;
    cookies && cookies.split(';').forEach(
        (cookie)=>{
            keyValue = cookie.split('=');
            finalCookieObject[keyValue[0].trim()] = keyValue[1].trim();
        }
    );
    return finalCookieObject;
}

const server = http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    if(pathname !=='/pagesocket.js' && pathname !=='/favicon.ico' ){
        console.log("Request for " + pathname + " received.");
        const cookies = bakeCookies(request);
        console.log(cookies);
        var newCookies = [];
        if(!cookies.hasOwnProperty('sessionId')){
            var sid = uuidv4();
            newCookies.push(setCookie(
                'sessionId',
                sid,
                '/',
                false
            ));
        }
        if(!cookies.hasOwnProperty('audienceId')){
            var aid = uuidv4();
            newCookies.push(setCookie(
                'audienceId',
                aid,
                '/'
            ));
        }
        var pid = uuidv4();
        newCookies.push(setCookie(
            'pageviewId',
            pid,
            '/' //url.parse(request.url).pathname
        ));
        response.writeHead(200, {
            'Set-Cookie': newCookies
        });
    }else{
        response.writeHead(200);
    }




    if(pathname == "/") {
        html = fs.readFileSync("index.html", "utf8");
        response.write(html);
    } else if (pathname == "/pagesocket.js") {
        script = fs.readFileSync("pagesocket.js", "utf8");
        response.write(script);
    } else {
        html = fs.readFileSync("index.html", "utf8");
        response.write(html);
    }


    response.end();
});

/*server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;

    if (pathname === '/') {
        wss1.handleUpgrade(request, socket, head, function done(ws) {
            wss1.emit('connection', ws, request);
            console.log("Web Socket 1 connected");
        });
    } else if (pathname === '/bar') {
        wss2.handleUpgrade(request, socket, head, function done(ws) {
            wss2.emit('connection', ws, request);
            console.log("Web Socket 2 connected");
        });
    } else {
        console.log("Web Socket route not accepted!");
        socket.destroy();
    }
});*/



server.listen(3000);

console.log("Listening to server on 3000...");

// index.js


