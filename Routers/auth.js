/**
 *  /api/auth/
 */

const {Router} =  require('express');
const { check } = require('express-validator');
const route = Router();

const {controllersAuth} =  require('../Controllers/auth')
const {loginMiddelwares} = require('../Middlewares/authMiddelwares')
const {validarCampos} = require('../Middlewares/validadCampos');

route.post('/login',[
   //middelwares
   ...loginMiddelwares

],controllersAuth.authLogin);

route.post('/google',[
  check('id_token','El id_token es necesario').notEmpty(),
  validarCampos,
],controllersAuth.googleSingIn)


module.exports = route;