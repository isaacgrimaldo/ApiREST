const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { check } = require('express-validator');

const {validarCampos} =  require('../validadCampos');
const { collecionValidator, validFile } = require('./helpers');

const  validUpload = (files, extensionsAccepted  = ['jpg', 'png', 'gif','jpeg'], folder ='') =>{

 return new Promise((resolve, reject) =>{
     
     const {  file1 } = files;
     const getExtencion = file1.name.split('.');
     const extecion = getExtencion[getExtencion.length-1];
    
     if(!extensionsAccepted.includes(extecion)){
        return reject(`La extencion ${extecion} no esta permitida en el servidor solo estan permitidas ${extensionsAccepted}`);
     }

         //se genera un id unico
         const  nameFileInDB = uuidv4() + '.' + extecion;  
         const uploadPath =  path.join(__dirname, '../../Uploads/', folder ,nameFileInDB);
         
      file1.mv(uploadPath, function(err) { // mueve el archvivo a la carpeta uploads en la raiz del programa
        if (err) {
         return reject(err);
        }

         resolve(nameFileInDB);

       });

});
}


const middlewaresUploads = {
    
   putFiles:[
     check('id','Ingrese un id valido').isMongoId(),
     check('collecion').custom( c => collecionValidator( c , ['users', 'products'] )),
     validFile,
     validarCampos        
   ]

}

module.exports = {
    validUpload,
    middlewaresUploads,
}