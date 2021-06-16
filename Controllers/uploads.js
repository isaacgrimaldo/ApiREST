const path = require('path');
const fs = require('fs');

const { response, request } = require("express")
const { validUpload } =  require("../Middlewares/uploads");

const {User , Product} =  require("../Models");

const controllersUploads = {
       

    UploadFile: async(req ,  res =response) => {
    
         try {
           const name = await validUpload(req.files, undefined, 'textos') ;
           return res.json({name});

         } catch (error) {

            console.log(error);
            return res.status(400).json({
                msg:error,
              })
         }
    
 },

 putFile: async(req =request, res =response) => {
     
      const {collecion , id} = req.params; 
  
      let modelo;
      switch (collecion) {
        case 'users':
                 
           modelo = await User.findById(id);
           if(!modelo || !modelo.estado){
               return res.status(404).json({msg:'Usuario borrado o no encontrado en la base de datos'});
           }
          
          break;
       case'products':
           
          modelo = await Product.findById(id);
          if(!modelo || !modelo.estado){
              return res.status(404).json({msg:'El producto fue borrado o no encontrado en la base de datos'});
          }
                
          break;
        default:
          return res.status(500).json({msg:`No sea programado la coleccion: ${collecion}` });
      }

      try {

       if(modelo.img){
        
            const pathLastFile = path.join(__dirname ,'../Uploads', collecion , modelo.img);
         
           if(fs.existsSync(pathLastFile)){ //verifica que existe
               fs.unlinkSync(pathLastFile)//borra el documento
           }
       }

        const name = await validUpload(req.files , undefined , collecion) ;
        modelo.img = name;
        await modelo.save();
          
        return res.status(201).json({
           ok:true,
           modelo,
        })

      } catch (error) {

         console.log(error);
         return res.status(400).json({
             msg:error,
           })
      }
      
   
 },

        

}


module.exports = {
    controllersUploads,
}