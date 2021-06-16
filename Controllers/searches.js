const { response } = require("express");
const {ObjectId} = require('mongoose').Types;

const {
    Category,
    Product,
    User,  
} =  require("../Models");


const searchUsers = async (info = '' , res  ) => {
        
    const isMongoId = ObjectId.isValid(info);
    
    if(isMongoId){
        const userFind = await User.findById(info);
        
        if(!userFind){
           
            return res.status(400).json({
                result:[
                     
                ]
            })
            

        }else{

            return res.status(200).json({
                result:[
                    (userFind.estado) ? userFind : [] 
                ]
            })
        }
    }
      

    const  regex = new RegExp(info , 'i') //quita le key sencible

    //bisqueda personalizada
    const  usuario = await User.find({
        $or:[{name: regex }, {email:regex}],
        $and:[{estado:true}]
    })
  
    return res.status(200).json({
        result:[
            usuario
        ]
      })
   
}

const searchCategorys = async (info = '' , res  ) => {
        
    const isMongoId = ObjectId.isValid(info);
    
    if(isMongoId){
        const categoryFind = await Category.findById(info);
        
        if(!categoryFind){
           
            return res.status(400).json({
                result:[
                     
                ]
            })
            

        }else{

            return res.status(200).json({
                result:[
                    (categoryFind.estado) ? categoryFind : [] 
                ]
            })
        }
    }
      

    const  regex = new RegExp(info , 'i') //quita le key sencible

    //bisqueda personalizada
    const  category = await Category.find({
        $or:[{name: regex }],
        $nor:[{estado:false}]
    })
  
    return res.status(200).json({
        result:[
            category
        ]
      })
   
}

const searchProducts = async (info = '' , res  ) => {
        
    const isMongoId = ObjectId.isValid(info);
    
    if(isMongoId){
        const productosFind = await Product.findById(info)
                                           .populate('user','name')
                                           .populate('category','name')
        
        if(!productosFind){
           
            return res.status(400).json({
                result:[
                     
                ]
            })
            

        }else{

            return res.status(200).json({
                result:[
                    (productosFind.estado) ? productosFind : [] 
                ]
            })
        }
    }
     

    const  regex = new RegExp(info , 'i') //quita le key sencible

    //bisqueda personalizada
    const  products = await Product.find({
        $or:[{name: regex }],
        $and:[{estado:true}]
    })
    .populate('category','name')
  
    return res.status(200).json({
        result:[
            products
        ]
      })
   
}


const collection = {
    user:      'users',
    products:  'products',
    category:  'categorys',
    rol:       'rols',
}


const searchesCollecAndProducts = (req , res = response ) => {
     const {Collection , Info} =  req.params;
     
     switch (Collection) {
         case collection.user:
                searchUsers(Info, res);
             break;
        case collection.category:
                searchCategorys(Info, res);
             break;
        case collection.products:
               searchProducts(Info, res);
             break;
         default: res.status(500).json({message: `Busqueda en la collecion ${Collection} no hacido imprementada`});
             break;
     }

     
}


module.exports = { 
     searchesCollecAndProducts
}