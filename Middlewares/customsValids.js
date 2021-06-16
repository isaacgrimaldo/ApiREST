const {request , response} =  require('express');
const User =  require('../Models/User');
const bcryptjs = require('bcryptjs');
const { generarToken } = require('../Helpers/generartoken');



const nameInUse = async( req = request , res = response , next ) => {
     
    try {
        const {name} = req.body;
        const validName =  await User.findOne({name});
        if(validName){

          return res.status(400).json({
                ok:false,
                msg:`El nombre: ${name}, ya esta en uso`
            });

        }else{
            
            next();
        }
        
    } catch (error) {
        res.status(401).status(401).json({
            ok:false,
            msg:'ERROR en el servidor espere'
        })
    }

}

const emailInUse = async ( req = request , res = response , next ) => {
    
    try {
       
    const {email} = req.body;
    const validEmail =  await User.findOne({email});
    if(validEmail){

       return res.status(400).json({
            ok:false,
            msg:`El Correo: ${email}, ya esta en uso`
        });

    }else{

        next();
    }


    } catch (error) {
        res.status(401).status(401).json({
            ok:false,
            msg:'ERROR en el servidor espere'
        })
    }

}

const loginVerific = async (req =request ,  res =response,  next) =>{
   
    const {email ,  password } = req.body;

    const [user] = await Promise.all([
        User.findOne({email}),
    ])

    if(!user){
       return res.status(400).json(
        {
            ok:false,
            msg:'Correo o Contraseña, no  valido'
        })
    }

   const confirmPassword =await bcryptjs.compare(password, user.password)
   
   if(!confirmPassword){
   return res.status(400).json(
       {
        ok:false,
        msg:'Correo o Contraseña, no  valido'
       })
        
   }

   if(!user.estado){
       return res.status(400).json({
           ok:false,
           msg:'usuario borrado o no encontrado en la base de datos'
       })
   }
   
    next()
}

const regresarToken = async (req =response , res =response , next) => {
    
    const {email} = req.body; 
    
    const infoUser = await User.findOne({email});
    
    const informacion = {
        uid:   infoUser._id,
        name:  infoUser.name,
        email: infoUser.email,
        rol:    infoUser.rol
    }
 
     if(infoUser){
         const token = await generarToken(informacion);
         req.body = { ...req.body , token  };
         next();
     }else{
        return res.status(500).json({message:'Hable con le abministacion'});
     }
}


const validarRol = (req =request , res = response , next) =>{
         
    if(!req.userPeticion){
        return res.status(500).json({
            msg:'!!NO se verifico el token antes de acceder a la petición'
        });
    }
    
    const {rol} = req.userPeticion
        
    if(rol !== 'ADMIN' ){
        return res.status(401).json({
            msg:'Usuario sin permiso para realizar esta accion'
        });
    }

    next();
}


module.exports = {
    nameInUse,
    emailInUse,
    loginVerific,
    regresarToken,
    validarRol,
}