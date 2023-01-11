// file: routes/admin.js
const upload = require('../upload');
const conn = require('../connect');

module.exports = function(server) {
    server.get('/api/product', function(req, res) {
        let sql = "SELECT p.*, c.name as cat_name FROM products p JOIN categories c ON p.category_id = c.id Order By p.id DESC";
        conn.query(sql, function(err, data) {
            res.send({
                result: data,
                status: true
            })
        })
    });


    server.post('/api/product', upload.single('my_file'), function(req, res) {
        req.body.image = req.file.filename;
        conn.query("INSERT INTO products SET ?", req.body, function(err) {
            res.send({
                result: req.body,
                status: true
            })
        })
    });

    server.get('/api/product/:id', function(req, res) {
        let id = req.params.id;
        conn.query("SELECT * FROM products WHERE id = ?", [id], function(err, data) {
            res.send({
                result: data.length > 0 ? data[0] : null,
                status: true
            })
        })
    });

    server.delete('/api/product/:id', function(req, res) {
        let id = req.params.id;
        conn.query("DELETE FROM products WHERE id = ?", [id], function(err, data) {
            res.send({
                result: null,
                status: true
            })
        })
    });

    server.put('/api/product/:id', upload.single('my_file'), function(req, res) {
        req.body.image = req.file.filename;
        let id = req.params.id;
        conn.query("UPDATE products SET ? WHERE id = ?", [req.body, id], function(err) {
            res.send({
                result: req.body,
                status: true
            })
        })
    });

}