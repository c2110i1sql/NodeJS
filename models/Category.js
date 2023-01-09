const conn = require('../connect');

var Category = {
    getAll: function(cb) {
        return conn.query("SELECT * FROM categories", cb);
    },
    create: function(data, cb) {
        return conn.query("INSERT INTO categories SET ?", data, cb);
    },
    getById: function(id, cb) {
        return conn.query("SELECT * FROM categories; SELECT * FROM categories WHERE id = ?", [id], cb)
    },
    update: function(data, id, cb) {
        return conn.query("UPDATE categories SET ? WHERE id = ?", [data, id], cb)
    },
    delete: function(id, cb) {
        conn.query("DELETE FROM categories WHERE id = ?", [id], cb);
    }
}

module.exports = Category;