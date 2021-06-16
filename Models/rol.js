const {Schema ,  model} = require('mongoose');

const rolSchema = new Schema({
    rol:{
        type:String,
        required: [true , 'Se require el un rol para el usuario']//(es requiro, mensaje si ocurre un error)
    }
})


module.exports = model('Rol',rolSchema);
