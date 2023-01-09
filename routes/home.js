// file: routes/home.js
var HomeController = require('../controllers/HomeController')
module.exports = function(server) {
    server.get('/', HomeController.index);
    
    server.get('/about',  HomeController.about);
    
    server.get('/contact',  HomeController.contact);
}