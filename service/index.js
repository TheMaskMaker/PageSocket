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
        returnText = query.pageviewId;
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


