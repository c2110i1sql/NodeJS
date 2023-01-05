const Joi = require('joi');
const conn = require('../connect');

module.exports = function(server) {
    server.get('/admin/category', function(req, res) {
        conn.query("SELECT * FROM categories", function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.render('admin/category/index', {
                cats: data,
                errors: null
            })
        })
    });

    server.get('/admin/category/create', function(req, res) {
        res.render('admin/category/create', {
            errors: null
        })
    });

    server.post('/admin/category/create', function(req, res) {
        // validate 
        schema = Joi.object().keys({ 
            name: Joi.string().required().min(3).messages({
                "string.empty": "Tên danh mục không để trống",
                "string.min" : "Tên danh mục ít nhất là 3 ký tự"
            }),
            status: Joi.number().required().messages({"number.empty": "Trang thai khong duoc de trong"})
        }); 

        const {error} = schema.validate(req.body);

        if (error) {
            res.render('admin/category/create', {
                errors: error.details
            });
        } else {
            conn.query("INSERT INTO categories SET ?", req.body, function(err, data) {
                if (err) return new Error("Loi truy va " + err.sqlMessage)
                res.redirect('/admin/category');
            })
        }
       
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