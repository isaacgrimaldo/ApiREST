const Rols =  require('../Models/rol')

const ValidRolbd = async(rol = '') =>{
    const ValidRolbd = await Rols.findOne({rol});
    if(!ValidRolbd){
      throw new Error(`El Rol ${rol} no exite en la base de datos`)
    }
} 

module.exports = {ValidRolbd}