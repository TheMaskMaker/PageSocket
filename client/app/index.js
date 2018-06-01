//getting stuff I need
const express = require('express');
const path = require('path');
const events = require('events');
const fs = require('fs');
const http = require("http");
const url = require("url");
const uuidv4 = require('uuid/v4');
/*const WebSocket = require('ws');

const wss1 = new WebSocket.Server({ noServer: true });


wss1.on('connection', (ws) => {

    ws.on('message', (message) => {

        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.send('TO BE ADDED');
});



const wss2 = new WebSocket.Server({ noServer: true });

wss2.on('connection', function connection(ws) {
    // ...
});*/


const server = http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200);

    if(pathname == "/") {
        html = fs.readFileSync("index.html", "utf8");
        response.write(html);
    } else if (pathname == "/pagesocket.js") {
        script = fs.readFileSync("pagesocket.js", "utf8");
        response.write(script);
    } else {
        console.log("bad route");
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


