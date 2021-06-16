require('dotenv').config();
const express = require('express');
const cors =  require('cors');
const fileUpload = require('express-fileupload') ;

const { ConnectDataBaseMg } = require('../DataBase/config');

//manejar express como un objeto
class Server{ 
   
   constructor(){
       this.app = express(); 
       this.port = process.env.PORT;
       
       this.paths= {
          auth:'/api/auth',
          categorys: '/api/categorys',
          products: '/api/products',
          searches: '/api/searches',
          users:'/api/users',
          uploads:'/api/uploads',
       }

       this.DataBase();

       this.Middelwares();
       
       //rutas de la aplicacion
       this.routers(); 
   }
      
   async DataBase(){
       await ConnectDataBaseMg();
   }

   Middelwares(){

       //cors para seguridad en el uso de la api
       this.app.use( cors() );
      
       //parsear los datos de la peticiones a json
       this.app.use(express.json())
         
       //carperta estatica
       this.app.use(express.static('public'));
       
       //aceptar archivos
       this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath:true,
        }));

   }

   routers(){
       
      this.app.use(this.paths.auth, require('../Routers/auth'));
      this.app.use(this.paths.users, require('../Routers/users')); //para implentar las rutas de un path
      this.app.use(this.paths.products, require('../Routers/product'));
      this.app.use(this.paths.categorys, require('../Routers/categorys'));

      this.app.use(this.paths.searches, require('../Routers/searches'));
      this.app.use(this.paths.uploads, require('../Routers/uploads'));
   }
 
   listen(){
        
       this.app.listen(this.port , () =>{
           console.log('App corriendo en el puerto', this.port);
       })
}

}


module.exports = Server;