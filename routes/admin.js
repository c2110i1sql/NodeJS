// file: routes/admin.js
module.exports = function(server) {
    server.get('/admin', function(req, res) {
        res.render('admin/index')
        
    });
}