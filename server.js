const express = require('express');
const ejs = require('ejs');

const server = express();
server.use(express.static('public'));
server.set('view engine', 'html');
server.engine('html',ejs.renderFile)
server.get('/', function(req, res) {
    // res.send("<h1> Hello NodeJS</h1>");
    res.render('home')
});

server.get('/about', function(req, res) {
    res.render('about')
});

server.get('/contact', function(req, res) {
    res.render('contact')
});

server.listen(3000, function() {
    console.log('Server dang mo tai cong: http://localhost:3000');
})