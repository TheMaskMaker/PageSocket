//getting stuff I need
const path = require('path');
const events = require('events');
const fs = require('fs');
const http = require("http");
const url = require("url");
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');
const fetch = require("node-fetch");

const wss1 = new WebSocket.Server({ noServer: true });

const PORT = process.env.PORT || "3002";
const SERVICE_HOST = process.env.SERVICE_HOST || "service";
wss1.on('connection', (ws) => {

    ws.on('message', (message) => {
        console.log('Gateway received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
        ws.send('startin server contact');
        var queryString = '0';
        console.log(typeof JSON.parse(message));
        try{
            pmessage = JSON.parse(message);
            if(pmessage.hasOwnProperty("payload")){
                if(pmessage.payload.hasOwnProperty('pageviewId')){
                    queryString = pmessage.payload.pageviewId;
                }
            }
        }catch(e){
            console.log(e,'wasnt json, silly mortal. wtf kind of feeds u giving us here');
        }
        fetch('http://' + SERVICE_HOST + ':' + PORT + '?pageviewId=' + queryString)
                .then(res => res.json())
                .then(json => {
                    ws.send(JSON.stringify(json));
                    console.log(json);
                })
                .catch((err => {
                    console.log(err);
                }));
        ws.send('ending contact');
    });
});



const server = http.createServer(function (request, response) {
    response.end();
});

server.on('upgrade', function upgrade(request, socket, head) {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
        wss1.emit('connection', ws, request);
        console.log("Web Socket 1 connected");
    });
});



server.listen(3001);

console.log("Listening to server on 3001...");

// index.js


