// file: routes/admin.js
const upload = require('../upload');
const conn = require('../connect');
const connAsync = require('../connect-async');
module.exports = function(server) {
    server.get('/admin/product', function(req, res) {
        let numPage = 0;
        const limit = req.query.limit || 5;
        const page = req.query.page || 1;
        const start = (page - 1) * limit;
        let sql1 = "SELECT * FROM products";
        let _limit = start + ',' + limit;
        connAsync(sql1).then(function(result) {
            numPage = Math.ceil(result.length/limit)
        }).then(() => {
            let sql = "SELECT p.*, c.name as cat_name FROM products p JOIN categories c ON p.category_id = c.id Order By p.id DESC LIMIT " + _limit;
            connAsync(sql).then(function(data){
                res.render('admin/product/index', {
                    products: data,
                    numPage: numPage,
                    page: page,
                    limit: limit
                })
            }) 
        });

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