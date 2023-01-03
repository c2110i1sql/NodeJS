const conn = require('../connect');
module.exports = function(server) {
    server.get('/admin/category', function(req, res) {
        // res.send("<h1> Hello NodeJS</h1>");
        conn.query("SELECT * FROM categories", function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            // console.log({data})
            res.render('admin/category/index', {
                cats: data
            })
    
        })
        
    });
    
    server.get('/admin/category/create', function(req, res) {
        res.render('admin/category/create');
    });
    
    server.get('admin/category/edit/:id', function(req, res) {
        res.render('admin/category/edit');
    });
}