const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

const server = express();
// global.login = 'sdsdsds';  // global trong mã nodejs
// server.locals.email = 'adndc@gmail.cmol'; // global toàn bộ các file view

server.use(session({
    secret: 'bkap-session',
    resave: true,
    saveUninitialized: false
}));



// truyền biến global
// global trong mã nodejs
// global toàn bộ các file view
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json()); //. api
server.use(express.static('public'));
server.set('view engine', 'html');
server.engine('html',ejs.renderFile);

// khong can kiemr tra login van vao duoc
require('./routes/login')(server);
require('./routes/home')(server);
require('./routes/api')(server);

// middleware => kieemr tra login truoc khi vao cacs  router
server.use(function(req, res, next) {
    if (!req.session.login) {
        res.redirect('/admin/login');
    } else {
        server.locals.name = req.session.login.name;
    }
    
    next();
})

// chia router
require('./routes/admin')(server);
require('./routes/category')(server);
require('./routes/product')(server);

server.listen(3000, function() {
    console.log('Server dang mo tai cong: http://localhost:3000');
})