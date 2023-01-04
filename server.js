const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');


const server = express();
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json()); //. api
server.use(express.static('public'));
server.set('view engine', 'html');
server.engine('html',ejs.renderFile);

// chia router
require('./routes/home')(server);
require('./routes/admin')(server);
require('./routes/category')(server);

server.listen(3000, function() {
    console.log('Server dang mo tai cong: http://localhost:3000');
})