/*
   path : /api/categorys 
 */

const  { Router } =  require('express');
const {validarToken} =  require('../Middlewares/validarToken');
const {controllerCategorys} = require('../Controllers/categorys');
const {middelwaresCategorys} = require('../Middlewares/Categorys')

const route = Router();


route.get('/',[
  //middelwares
  middelwaresCategorys.getCategorys,

] ,controllerCategorys.getCategortys);

route.get('/:id',[
  //middelwares
   ...middelwaresCategorys.getOneCategory,

],controllerCategorys.getOneCategory );

route.post('/',[
    //middelwares
    validarToken,
    ...middelwaresCategorys.createCategory,

],controllerCategorys.createCategory)

route.put('/:id',[
   //middelwares
   validarToken,
   ...middelwaresCategorys.putCategory,

],controllerCategorys.putCategory);

route.delete('/:id',[
   //middelwares
   validarToken,
   ...middelwaresCategorys.deletCategory,

],controllerCategorys.deletCategory);



module.exports = route;