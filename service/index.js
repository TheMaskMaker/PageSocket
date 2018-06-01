//getting stuff I need
const http = require("http");
const url = require("url");

var app = http.createServer(function(req,res){
    console.log(req.url);
    var url_parts = url.parse(req.url, true);
    console.log(url_parts);
    var query = url_parts.query;
    console.log(query);
    var returnText;
    if(Object.prototype.hasOwnProperty.call(query,'pageviewId')){
        const id = parseInt(query.pageviewId);
        if(id == 0) returnText = 'What? You done goofed to have viewed this 0 times';
        if(id > 0 && id <3) returnText = 'Not enough. VIEW ME MORE! REFRESH! REFRESH!';
        if(id >= 3 ) returnText = 'Wow you viwed the page ' + id + ' times!';
    }else{
        returnText = '?????';
    }
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ Hello: returnText + '--' }));
    res.end();
});
app.on('error', function (e) {
    console.log(e);
});
app.listen(3002);


