const conn = require('../connect');

module.exports = function(server) {
    server.get('/admin/category', function(req, res) {
        conn.query("SELECT * FROM categories", function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.render('admin/category/index', {
                cats: data
            })
        })
    });
    
    server.get('/admin/category/create', function(req, res) {
        res.render('admin/category/create');
    });

    server.post('/admin/category/store', function(req, res) {
        conn.query("INSERT INTO categories SET ?", req.body, function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.redirect('/admin/category');
        })
    });

    server.get('/admin/category/edit/:id', function(req, res) {
        // res.render('admin/category/edit');
        var id = req.params.id;
        conn.query("SELECT * FROM categories; SELECT * FROM categories WHERE id = ?", [id], function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.render('admin/category/edit', {
                cats: data.length > 0 ? data[0] : [],
                catEdit: data.length > 1 && data[1].length > 0 ? data[1][0] : {}
            })
        })
    });

    server.post('/admin/category/update/:id', function(req, res) {
        var id = req.params.id;
        conn.query("UPDATE categories SET ? WHERE id = ?", [req.body, id], function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.redirect('/admin/category');
        })
    });

    server.get('/admin/category/delete/:id', function(req, res) {
        var id = req.params.id;
        conn.query("DELETE FROM categories WHERE id = ?", [id], function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.redirect('/admin/category');
        })
    });
    
}