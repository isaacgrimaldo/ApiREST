const {check} = require('express-validator');
const {validarCampos} = require('../Middlewares/validadCampos');
const {loginVerific , regresarToken} = require('./customsValids')


const loginMiddelwares = [
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').notEmpty(),
    loginVerific,
    regresarToken,
    validarCampos,
]



module.exports = {loginMiddelwares};
