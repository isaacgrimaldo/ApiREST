const {response, request} =  require('express');
const Category =  require('../Models/Category')

const controllerCategorys = {

   getCategortys: async(req = request ,  res = response ) => {
      
     const {limit ,  start} = req.query;
     const query = {estado:true};

    try {
        const [categorys , total] = await  Promise.all([
             Category.find(query)
                     .populate('user', 'name')//llena las referencias
                     .skip( Number(start))
                     .limit(Number(limit)),

            Category.countDocuments(query)
             
        ]);
               
        return res.status(200).json({
            total,
            categorys
        })

    } catch (error) {
        console.log(error);
       return res.status(500).json({msg:'Ocurrio un error, hable con el abministador'});
    }

   },


   getOneCategory: async(req = request, res = response ) => {
        const {id} = req.params;
       
       try {
           
         const category =  await Category.findById(id)
                                .populate('user','name');
            
         res.status(200).json({
             ok:true,
             category
         })

       } catch (error) {
           console.log(error);
        return res.status(500).json({msg:'Ocurrio un error, hable con el abministador'});    
       }

   },

   createCategory: async(req = request, res = response) => {
         const {name} = req.body;
         
         const data = {
             name: name.toUpperCase(),
             user:  req.userPeticion._id
         }

         try {
           
           const category = new Category(data);
           await category.save(); 
           
          return res.status(201).json({
               ok: true,
               category,
           })

         } catch (error) {
            console.log(error);
            return res.status(500).json({msg:'Ocurrio un error, hable con el administador'});        
         }
         
   },

   putCategory: async( req , res = response ) => {
       const {id} = req.params;
       const { _id ,estado, __v , ...update} = req.body; 
       
       update.name = update.name.toUpperCase(); 
       update.user = req.info.uid; 

       try {
           
        const category =  await Category.findByIdAndUpdate(id, update, {new:true});
           
        res.status(200).json({
            ok:true,
            category
        })

      } catch (error) {
          console.log(error);
       return res.status(500).json({msg:'Ocurrio un error, hable con el abministador'});    
      }

   },
    
   deletCategory: async(req , res = response ) => {
       const {id} = req.params;

       try {
           
        const category =  await Category.findByIdAndUpdate(id ,{estado:false}, {new:true});
           
        res.status(200).json({
            ok:true,
            category
        })

      } catch (error) {
          console.log(error);
       return res.status(500).json({msg:'Ocurrio un error, hable con el abministador'});    
      }

   }

}
 

module.exports = {
    controllerCategorys,
}