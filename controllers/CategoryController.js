const Joi = require('joi');
var Category = require('../models/Category')

var CategoryController = {
    index: function(req, res) {
        Category.getAll(function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.render('admin/category/index', {
                cats: data,
                errors: null
            })
        });
    },

    create: function(req, res) {
        res.render('admin/category/create', {
            errors: null
        })
    },

    store: function(req, res) {
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
            Category.create(req.body, function(err, data) {
                if (err) return new Error("Loi truy va " + err.sqlMessage)
                res.redirect('/admin/category');
            });
        }
       
    },

    edit: function(req, res) {
        // res.render('admin/category/edit');
        var id = req.params.id;
        Category.getById(id, function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.render('admin/category/edit', {
                cats: data.length > 0 ? data[0] : [],
                catEdit: data.length > 1 && data[1].length > 0 ? data[1][0] : {}
            })
        })
       
    },
    update: function(req, res) {
        var id = req.params.id;
        Category.update(req.body, id, function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.redirect('/admin/category');
        });
    },
    delete:  function(req, res) {
        var id = req.params.id;
        Category.delete(id, function(err, data) {
            if (err) return new Error("Loi truy va " + err.sqlMessage)
            res.redirect('/admin/category');
        })
    }

}

module.exports = CategoryController;