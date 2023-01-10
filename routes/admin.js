// file: routes/admin.js
module.exports = function(server) {
    server.get('/admin', function(req, res) {
        console.log(req.session.login);
        res.render('admin/index')
    });

    server.get('/admin/login', function(req, res) {
        res.render('admin/login')
    });

    server.post('/admin/login', function(req, res) {
        req.session.login = req.body;
        res.redirect('/admin');
    });
}