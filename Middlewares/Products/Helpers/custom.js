const { response, request } = require("express")
const {Category} = require('../../../Models');
const {Product} = require('../../../Models');



const  selectCategory = async(req  =request, res =response , next) => {
   
      let { category:name } = req.body;
      name = name.toUpperCase();  
      const isExists = await Category.findOne({name});

      if(!isExists){
          return res.status(400).json({
              message:`La categoria ${name}, no existe en la base de datos`,
            })
      }

      if(!isExists.estado){
        return res.status(400).json({
            message:`La categoria ${name}, no existe en la base de datos`,
          })
      }
      
    req.body.category = isExists._id;
    next()

}


const  selectUser = (req  =request, res =response , next) => {
    const {uid} = req.info;
    req.body.user = uid;    
    next()
}

const isUnique =  async(name = '') => {
     name = name.toUpperCase()
     const notIsUnique =  await Product.findOne({name});
     
     if(notIsUnique){
        throw new Error(`El producto ${name} ya existe en la base de datos`);
     }

}

const exitsCategory =  async(req =request, res =response, next) => { 
  
      if(req.body.category){
            
            const name =  req.body.category.toUpperCase();
            const isExist = await Category.findOne({name});
            
            if(!isExist){
              return  res.status(400).json({
                 message:`la category: ${name} no existe o fue borrada de la base dedatos `,
                })
            }

            if(!isExist.estado){
              return res.status(400).json({
                message:`la category: ${name} no existe o fue borrada de la base dedatos `,
               })
           }

           req.body.category = isExist._id;
           next();
      }else{
        next();
      }
} 


const exitsProduct =  async(id =' ') => { 
    
  const isExists = await Product.findById(id);

  if(!isExists){
      throw new Error(`El producto con le id:${id} no existe o fue borrado de la base de datos`);
  }

  if(!isExists.estado){
    throw new Error(`El producto con le id:${id} no existe o fue borrado de la base de datos`);
  }
} 



module.exports = {
     selectCategory,
     selectUser,
     isUnique,
     exitsCategory,
     exitsProduct,
}