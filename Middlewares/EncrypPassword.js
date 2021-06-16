const {request , response } = require('express');
const bcrypt = require('bcryptjs');


const encryptPassword = (req =  request ,  res = respsece , next) => {
   
    const {password} = req.body;
   
    if(password){
        
        const salt =  bcrypt.genSaltSync();
        const enctypt = bcrypt.hashSync(password , salt);
      
        req.body.password = enctypt; 
        next();
    }else{
        return res.status(400).json({
            msg:'Password no enviado'
        })
    }



}
 

module.exports = {encryptPassword};
