require('dotenv').config();
const jwt = require('jsonwebtoken');

//asi se generan lo tokens
const generarToken = (infomacion) =>{
   
    return new Promise((resolve, reject) =>{
         
          const payload = infomacion;
          jwt.sign(payload,process.env.SECRET_KEY,{
              expiresIn:'4h'
          },(err , token) =>{
              if(err){
                 console.log(err);
                 reject(err);
              }else{
                  resolve(token);
              } 
          });
    });
}

module.exports = {generarToken};