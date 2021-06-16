/**
 *  Validaciones de rutas
 */
const { request } = require('express');
const User = require('../Models/User')

const userValid = async(id = '') =>{
     
    const confirm = await User.findById(id);
 
    if(!confirm){
        throw new Error(`Usuario con el id:${id} no existe en la base de datos`);
    }
}  

const  limitExitd = async(limit) => {
        
    const confirm = await User.find()
    
    if(confirm.length < limit){
        throw new Error(`El numero ${limit} supera el numero de usuarios de la base de datos`);
    }
}


module.exports = {
     userValid,
     limitExitd,
}