const {Router} =  require('express');
const route = Router();

const {middlewaresProducts} = require('../Middlewares/Products');
const {controllersProducts} = require('../Controllers/products')


route.post('/',[    
    ...middlewaresProducts.createProduct
],controllersProducts.createProduct);


route.get('/',[
    ...middlewaresProducts.getProducts,
],controllersProducts.getProducts);

route.get('/:id',[
    ...middlewaresProducts.getOneProduct,
],controllersProducts.getOneProduct);

route.put('/:id',[
    ...middlewaresProducts.putProduct,
],controllersProducts.putProduct);

route.delete('/:id',[
    ...middlewaresProducts.deleteProduct,
],controllersProducts.deleteProduct);

module.exports = route;