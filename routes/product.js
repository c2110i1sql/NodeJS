// file: routes/admin.js
const upload = require('../upload');
const conn = require('../connect');

module.exports = function(server) {
    server.get('/admin/product', function(req, res) {
        let sql = "SELECT p.*, c.name as cat_name FROM products p JOIN categories c ON p.category_id = c.id Order By p.id DESC";
        conn.query(sql, function(err, data) {
            res.render('admin/product/index', {
                products: data
            })
        })
    });

    server.get('/admin/product/create', function(req, res) {
        res.render('admin/product/create')
    });

    server.post('/admin/product/create', upload.single('my_file'), function(req, res) {
        req.body.image = req.file.filename;
        conn.query("INSERT INTO products SET ?", req.body, function(err) {
            res.redirect('/admin/product');
        })
    });
}