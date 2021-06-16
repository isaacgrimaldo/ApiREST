const {Schema , model } =  require('mongoose');

const Category = new Schema({
    
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
    }

});


Category.methods.toJSON = function(){
    const {__v , estado , ...Category} =  this.toObject();

     return Category;
} 

module.exports = model('Category', Category);