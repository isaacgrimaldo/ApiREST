/**
 *  PATH = '/api/users';
 */

const express = require('express');
const route =  express.Router();

const {ControllersUsers} =  require('../Controllers/users');

const { 
  validacionesRegister, 
  ValidUpdateUser, 
  validsGetUsers,
  validDeletUser
}   = require('../Middlewares/resgisterValidations');

const {validarToken} = require('../Middlewares/validarToken');

route.use(validarToken);


route.get('/',[
   //middelwares
   ...validsGetUsers

],ControllersUsers.getUsers);

route.post('/',[ 
    //middlewares
    ...validacionesRegister
],
ControllersUsers.CreateUser);

route.put('/put/:id',[ 
   //middelwares
  ...ValidUpdateUser
]  
,ControllersUsers.putUser);

route.delete('/:id',[
    //middelwares   
    ...validDeletUser

] ,ControllersUsers.deleteUsers)



module.exports = route;






//route.get('/',,  ControllersUsers.getUseres);
//route.put('/:id', ControllersUsers.putUsers); //espefica que a ruta nececita un paramentro para funcionar