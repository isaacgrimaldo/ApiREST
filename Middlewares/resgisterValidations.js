const {check} = require('express-validator');

const { validarCampos } = require('./validadCampos');
const{nameInUse, emailInUse} = require('../Middlewares/customsValids');
const { encryptPassword } = require('./EncrypPassword');
const { ValidRolbd } = require('../Helpers/bd-valid');
const {userValid, limitExitd} = require('../Helpers/customsValid');
const {validarRol} =require('../Middlewares/customsValids')

const validacionesRegister = [
    check('name','El nombre es requerido').notEmpty(),
    check('name','El nombre debe tener  6-16 carateres'),
    check('email','El Correro es requerido').notEmpty(),
    check('email','Correo invalido').isEmail(),
    check('password','La contraseña debe ser 6-16 carateres').isLength({min:6 , max:16}),
    check('rol','El rol es requerido').notEmpty(),
    //check('rol','Rol inexistente').isIn(['ADMIN','USER']),
    encryptPassword,
    check('rol').custom(ValidRolbd),
    ///poner todo lo asyn al fina de la cola de Middlewares
    nameInUse,
    emailInUse,
    validarCampos,
]



const ValidUpdateUser = [
    check('id','El id no valido').isMongoId(),
    check('id').custom(userValid),
    check('rol').custom(ValidRolbd),
    validarCampos,
]


const validsGetUsers = [
    check('limit').custom(limitExitd),
    check('desde').custom(limitExitd),
    check('limit','El limite de ser un numero').isNumeric(),
    check('desde','El desde de ser un numero').isNumeric(),
    validarCampos
]

const validDeletUser =[
    check('id','El id no valido').isMongoId(),
    check('id').custom(userValid),
    validarRol,  
    validarCampos,
]

module.exports = {
    validacionesRegister,
    ValidUpdateUser,
    validsGetUsers,
    validDeletUser,
};