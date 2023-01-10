// file: routes/admin.js
const conn = require('../connect');

module.exports = function(server) {
    server.get('/admin/login', function(req, res) {
        res.render('admin/login', {error: null})
    });
    
    server.get('/admin/logout', function(req, res) {
        req.session.destroy(); // loai bo session
        res.redirect('/admin/login');
    });

    server.post('/admin/login', function(req, res) {
        let sql = "SELECT id, name, email FROM users WHERE email = ? AND password = ?";
        conn.query(sql,[req.body.email, req.body.password], function(err, data) {
            if (err) {
                res.render('admin/login', {
                    error: 'Có lỗi từ phía máy chủ'
                })
            } else if (data.length == 0) {
                res.render('admin/login', {
                    error: 'Email hoặc mật khẩu không đúng'
                })
            } else {
                let login = data[0];
                req.session.login = login;
                res.redirect('/admin');
            }
            
        });
        
    });
}