const {Schema , model} =  require('mongoose');

const User = new Schema({
   
    name:{
        type: String,
        required: [true , 'Se require el nombre'],//(es requiro, mensaje si ocurre un error)
        unique: true,//Tiene que se unico
    },
     
    email:{
         type:String,
         required: [true , 'Se require un Correo'],
         unique: true,
    },

    password:{
        type:String,
        required: [true , 'Se require el una Contraseña']
    },
     
    img:{
        type:String,//url de una imagen
    },
     
    rol:{
        type:String,
        required: [true , 'El usuario nececita un rol'],
        default:'USER',
        emun:['ADMIN','USER'] //establece los valores que pude tomar 
    },
     
    estado:{ //acitvo en la base datos
       type:Boolean,
       default:true,
    },

    google:{ //si fue creado por google
        type:Boolean,
        default:false,
    }

})

//para que la mandar a imprimir el modelo credo solo mande la informacion necesario
User.methods.toJSON = function(){
    let {__v , password ,  _id:uid  ,...user} = this.toObject(); 
       
    user = {...user ,  uid}
     

    return  user;
}

module.exports = model('User', User);

/**
 *  1 nombre de la colleccion 
 *  2 modelo que usara esa colleccion
 */