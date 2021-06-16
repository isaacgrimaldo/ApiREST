const { response, request } = require("express");
const {Product} = require('../Models');

const controllersProducts = {
  
    getProducts: async(req =request ,  res =response) =>{
        const {limit ,  start} = req.query;
        const querys = {estado:true};
        
         try {
             
             const[products , total ] = await Promise.all([
                 Product.find(querys)
                         .populate('category','name')
                         .populate('user','name')
                         .limit( Number(limit))
                         .skip(Number(start)),
                 Product.countDocuments(querys)
             ])
           
           return res.status(200).json({total,  products});

         } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg:'ERROR EN EL SERVIDOR'
            })  
         }

    },
      
    getOneProduct: async(req =request ,  res =response) => { 
        const {id} = req.params;
        
        try {
            
           const producto = await Product.findById(id)
                                  .populate('user','name')
                                  .populate('category','name')

          return res.status(200).json({
              ok:true,
              producto
          })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:'ERROR EN EL SERVIDOR'
            })
        }
        
    },
  
    createProduct: async(req , res =response) => {
        
        let {estado  , ...data} =  req.body;
       
        data = {
        ...data, 
        name: data.name.toUpperCase(),
        } 

        try {

        const product = new Product(data);
        await product.save();

        return res.status(201).json({product});

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg:'ERROR EN LE SERVIDOR'
            })
        }

    },
    
    putProduct: async(req, res =response) => {
       const {id} = req.params;
       let {estado , __v , _id , ...update} = req.body;
       update = {

       }
       
       try {

           const  updateProduct = await Product.findByIdAndUpdate(id, update , {new:true})
                                                 .populate('user','name')
                                                 .populate('category','name')

          return res.status(200).json({
               ok:true,
               updateProduct
          })

       } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'ERROR EN LE SERVIDOR'
        })
    }
   },
    
   deleteProduct: async(req, res =response) => {
       const {id} = req.params;

       try {
            const deleteProduct = await Product.findByIdAndUpdate(id, {estado:false},{new:true});

            return res.status(200).json({
                ok:true,
                deleteProduct,
            })

       } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'ERROR EN LE SERVIDOR'
        })

     }
   },

}


module.exports = {controllersProducts};