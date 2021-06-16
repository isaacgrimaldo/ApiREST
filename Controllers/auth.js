const {request , response} = require('express');
const User =  require('../Models/User');
const { googleVerify } = require('../Helpers/googleVerifyc');
const {generarToken} = require('../Helpers/generartoken');


const controllersAuth = {

    authLogin:(req =request, res =response) => {
        
        try { 
             
            const {token} = req.body;
                   
            res.status(200).json({
                msg:'LOGIN',
                token
            })

        } catch (error) {
           console.log(error);
           res.status(500).json({
               msg:'Hable al abministrador'
           })         
        }
    },

  googleSingIn: async (req , res=response) => {

     const {id_token} = req.body;  

      try {
          
       const {name , email , img} =    await  googleVerify(id_token);
         
      const  find = await User.findOne({email , name});

      if(!find){
          const data = {
              name,
              email,
              img,
              google:true,
              password:'000',
          }

         user = new User(data);
         await user.save();  
      }

      if(!find.estado){
          return res.status(401).json({
              msg:'Hable con el administrador, usuario bloqueado'
          })
      }
       

      const informaccion = {
        uid:   find._id,
        name:  find.name,
        email: find.email,
        rol:   find.rol,
      }

     const token = await generarToken(informaccion)      

      res.status(200).json({
          ok:true,
          token,
          msg:'Google sing-in'
      })

      } catch (error) {
          console.log(error);
          res.status(400).json({
              msg:'Token de Google no valido'
          })
      }
     
  },


}


module.exports = {controllersAuth};