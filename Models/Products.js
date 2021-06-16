const {Schema , model } =  require('mongoose');

const Products = new Schema({
    
    name:{
       type:String,
       required:[true, 'El nombre es requerido'],
       unique:true,
    },
    
    estado:{
        type:Boolean,
        default:true,
        required:true,
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    cost:{type:Number, default:0},

    category:{
        type:Schema.Types.ObjectId , 
        ref:'Category',
        required:true,
    },

    descripcion:{type:String},
    lavailable:{type:Boolean, default:true},
    img:{type:String},
});


Products.methods.toJSON = function(){
    const {__v , estado , ...Products} =  this.toObject();

     return Products;
} 

module.exports = model('Product', Products);