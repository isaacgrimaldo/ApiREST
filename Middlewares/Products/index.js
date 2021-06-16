const {check , query , param} = require('express-validator');

const {validarCampos} = require('../validadCampos');
const {isAdmin} =  require('../Categorys/Helpers/customsValids');
const {selectCategory, 
       selectUser, 
       isUnique,  
       exitsProduct,
       exitsCategory} = require('./Helpers/custom');

const {validarToken} =  require('../validarToken');

const middlewaresProducts = {

    createProduct:[
       validarToken,
       check('name','El nombre es requerido').notEmpty(),
       check('name','Rango del nombre(6-16) caracteres').isLength({min:6, max:16}),
       check('category','La categoria del productos es necesaria').notEmpty(),
       selectCategory,
       check('name').custom(isUnique),
       selectUser,
       validarCampos,
   ],

   getProducts:[ 
      query('limit','Debe solicitar una paginacion').notEmpty(),
      query('start','Debe ingresar el inicio de la paginacion').notEmpty(),
      validarCampos, 
   ],
    
   getOneProduct:[
      check('id','El id del productos es obligatorio').notEmpty(),
      check('id','Ingrese un ID validado').isMongoId(),
      check('id').custom(exitsProduct),
      validarCampos,
   ],
    
   putProduct:[
     validarToken,  
    param('id','El id del productos es obligatorio').notEmpty(),
    check('id','Ingrese un ID validado').isMongoId(),
    check('id').custom(exitsProduct),
    check('name','Rango del nombre(6-16) caracteres').isLength({min:6, max:16}),
    check('name').custom(isUnique),
    exitsCategory,
    selectUser,
    validarCampos,
   ],

   deleteProduct:[
      validarToken,
      check('id','El id del productos es obligatorio').notEmpty(),
      check('id','Ingrese un ID validado').isMongoId(),
      check('id').custom(exitsProduct),
      isAdmin,
      validarCampos,  
   ],

}


module.exports = {middlewaresProducts};
    

