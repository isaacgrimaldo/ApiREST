const { response, request } = require("express");
const Category = require('../../../Models/Category')

const nameisValid = async (req =request , res =  response ,  next) =>{
       const name = req.body.name.toUpperCase();
       
       try{

          const  isfind = await Category.findOne({name});
          if(isfind){
             return res.status(400).json({message:`La categoria ${name} ya existe`}); 
          } 

          next();

       }catch(err){
         console.log(err);
         return res.status(500).json({message:'Hable con el administrador'});
       }
}

const exitsCategory =  async(id = '') => { 
   
    const isFind = await Category.findById(id)

    if(!isFind){
        throw new Error(`La categoria con el id:${id} no existe o  borrado de la base  de datos`);
    }

    if(!(isFind.estado)){
      throw new Error(`La categoria con el id:${id} no existe o  borrado de la base  de datos`)
    }
}


const isAdmin =  async ( req =request ,  res =response ,  next) =>{
    
      const {rol} = req.info; 
      
      if(rol != 'ADMIN'){
         console.log(req.info);
          res.status(401).json({message:'NO TIENES PERMISO'});
      }  

      next();
}


module.exports = {
   nameisValid,
   exitsCategory,
   isAdmin
};


