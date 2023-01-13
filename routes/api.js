// file: routes/admin.js
const upload = require('../upload');
const conn = require('../connect');

module.exports = function(server) {
    server.get('/api/product', function(req, res) {
        let sql = "SELECT p.*,c.name, count(f.product_id) as f_count, f.user_id, f.id as f_id FROM products as p JOIN categories c ON p.category_id = c.id LEFT JOIN favorites as f ON p.id = f.product_id GROUP BY p.id Order By p.id DESC";
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


    server.post('/api/login', function(req, res) {
        let sql = "SELECT id, name, email FROM users WHERE email = ? AND password = ?";
        conn.query(sql,[req.body.email, req.body.password], function(err, data) {
            if (err) {
                res.send({
                    result: req.body,
                    status: false,
                    message: 'Có lỗi từ phía máy chủ'
                })
               
            } else if (data.length == 0) {
                res.send({
                    result: req.body,
                    status: false,
                    message: 'Email hoặc mật khẩu không đúng'
                })
               
            } else {
                let user = data[0];
                res.send({
                    result: user,
                    status: true,
                    message: ''
                })
            }
            
        });
        
    });


    server.post('/api/add-favorite', function(req, res) {
        conn.query("INSERT INTO favorites SET ?", req.body, function(err) {
            res.send({
                result: req.body,
                status: true
            })
        })
    });

    server.delete('/api/remove-favorite/:id', function(req, res) {
        conn.query("DELETE FROM favorites WHERE id = ?", [req.params.id], function(err) {
            res.send({
                result: null,
                status: true
            })
        })
    });

}