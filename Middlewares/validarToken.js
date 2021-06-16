const { request } = require("express");
const jwt  = require("jsonwebtoken");
const User = require("../Models/User");

const validarToken = async(req  =request, res =response , next) =>{
  
     const token  = req.header('x-token');

     try {
               
        const payload =  jwt.verify(token, process.env.SECRET_KEY);
             
        req.userPeticion = await User.findById(payload.uid);
        req.info = payload;
          
        const active = req.userPeticion; 

        if(!active.estado){
             return res.status(400).json({message:'Token no valido: Usuario inavilitado'});
        }

        next()

     } catch (error) {
         console.log(error);
        return res.status(400).json({msg:'No tiene perimios para realizar esta acción'});
     }

}


module.exports = {validarToken};