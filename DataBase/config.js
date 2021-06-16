require('dotenv').config()
const mongoose = require('mongoose');

const ConnectDataBaseMg = async () => {
     
    try {
        
      await mongoose.connect(process.env.MONGO_DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
       });

       console.log('se connecto a la base datos correctamete');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar en la base de datos');
    }
}


module.exports = {ConnectDataBaseMg};
