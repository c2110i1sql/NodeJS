var CategoryController = require('../controllers/CategoryController')
module.exports = function(server) {
    
    server.get('/admin/category', CategoryController.index);

    server.get('/admin/category/create', CategoryController.create);

    server.post('/admin/category/create', CategoryController.store);

    server.get('/admin/category/edit/:id', CategoryController.edit) ;

    server.post('/admin/category/update/:id',CategoryController.update);

    server.get('/admin/category/delete/:id', CategoryController.delete);
    
}