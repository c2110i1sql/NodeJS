const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');


const server = express();

server.use(session({
    secret: 'bkap-session',
    resave: true,
    saveUninitialized: false
}));

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json()); //. api
server.use(express.static('public'));
server.set('view engine', 'html');
server.engine('html',ejs.renderFile);

// chia router
require('./routes/home')(server);
require('./routes/admin')(server);
require('./routes/category')(server);
require('./routes/product')(server);

server.listen(3000, function() {
    console.log('Server dang mo tai cong: http://localhost:3000');
})