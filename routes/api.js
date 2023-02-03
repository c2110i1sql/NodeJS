// file: routes/admin.js
const jwt = require('jsonwebtoken');
const upload = require('../upload');
const conn = require('../connect');
const passport = require('passport');
const fs = require('fs');

let JwtOptions = {};
JwtOptions.secretOrKey = "BKAPXYZ";

module.exports = function(server) {
    server.get('/api/product', passport.authenticate('jwt', {session: false}), function(req, res) {
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
                // console.log(user);
                let payload = {id: user.id};
                let token = jwt.sign(payload, JwtOptions.secretOrKey);
                user.token = token;
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
    
    server.post('/api/upload', upload.single('my_file'), function(req, res) {
        req.body.image = req.file.filename;
        res.send({
            result: req.file.filename,
            status: true
        })
    });

    
    server.put('/api/update-profile/:id', function(req, res) {
        let id = req.params.id;
        conn.query("UPDATE users SET ? WHERE id = ?", [req.body, id], function(err) {
            res.send({
                result: req.body,
                status: true
            })
        })
    });

    server.get('/api/check-token-expired', function(req, res) {
        // fs.unlink('public/uploads/anh.jpg');
        let tokenFromClient = req.headers["authorization"].split(' ');
        let token = tokenFromClient.length > 1 ? tokenFromClient[1] : null;
        jwt.verify(token, JwtOptions.secretOrKey, function(err, dataInToken) {
            if (err) {
                res.send({
                    result: err,
                    status: false
                })
            } else {
                let iat = dataInToken.iat; // tinh theo giay
                let currentTime = new Date().getTime() / 1000;
                let thoi_gian = currentTime - iat;
                res.send({
                    result: dataInToken,
                    thoi_gian: thoi_gian,
                    currentTime: currentTime,
                    status: true
                })
            }
        });
       
    });
}