const {check , query, param} = require('express-validator');
const {validarCampos} = require('../validadCampos');
const { nameisValid, exitsCategory, isAdmin } = require('./Helpers/customsValids');

const middelwaresCategorys = {

  getCategorys:[
      query('limit','Debe solicitar una paginacion').notEmpty(),
      query('start','Debe ingresar el inicio de la paginacion').notEmpty(),
      validarCampos,
  ],

  getOneCategory:[
    check('id','Ingrese un id valido').isMongoId(),
    check('id').custom(exitsCategory),
     validarCampos
  ],
   
  putCategory:[
    check('id','Ingrese un id valido').isMongoId(),
    check('id').custom(exitsCategory),
     validarCampos
  ],

  createCategory:[
     check('name','El nombre es requerido').notEmpty(),
     nameisValid,    
     validarCampos,
  ],
  
  deletCategory:[
    check('id','Ingrese un id valido').isMongoId(),
    check('id').custom(exitsCategory),
    isAdmin,
     validarCampos,
  ]
  
};


module.exports = {middelwaresCategorys};