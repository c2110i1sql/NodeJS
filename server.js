const express = require('express');

const server = express();

server.get('/', function(req, res) {
    // res.send("<h1> Hello NodeJS</h1>");
    res.sendFile(__dirname + '/index.html')
});
// http://localhost:3000/about/bach
server.get('/about/:name', function(req, res) {
    // res.send("<h1> Hello about</h1>");
    console.log(req.params);
});
// http://localhost:3000/hello?name=Minh
server.get('/hello', function(req, res) {
    // res.send("<h1> Hello about</h1>");
    console.log(req.query);
});

server.listen(3000, function() {
    console.log('Server dang mo tai cong: http://localhost:3000');
})