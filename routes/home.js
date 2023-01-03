// file: routes/home.js
module.exports = function(server) {
    server.get('/', function(req, res) {
        res.render('home')
        
    });
    
    server.get('/about', function(req, res) {
        res.render('about')
    });
    
    server.get('/contact', function(req, res) {
        res.render('contact')
    });
}