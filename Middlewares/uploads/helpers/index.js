

const collecionValidator = (collecion , collecionesAcceptables = [ ]) => {
      
    if(!collecionesAcceptables.includes(collecion)){
        throw new Error(`La colecion ${collecion} no existe en la base de datos`);
    }else{

        return true;
    }
}

const validFile = (req , res ,  next) =>{
     
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file1) {
           
        return res.status(400).json({
                ok:false,
                msg:'No se envio ningún arcchivo',
            });
      }else{
          next();
      }
      
}



module.exports = {
    collecionValidator,
    validFile,
}