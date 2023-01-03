const express = require('express');
const ejs = require('ejs');
const conn = require('./connect');

const server = express();
server.use(express.static('public'));
server.set('view engine', 'html');
server.engine('html',ejs.renderFile)

server.get('/', function(req, res) {
    // res.send("<h1> Hello NodeJS</h1>");
    conn.query("SELECT * FROM categories", function(err, data) {
        if (err) return new Error("Loi truy va " + err.sqlMessage)
        // console.log({data})
        res.render('home', {
            cats: data
        })

    })
    
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