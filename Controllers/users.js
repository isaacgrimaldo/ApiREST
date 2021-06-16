const {response ,  request} = require('express');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const ControllersUsers = {
     

     getUsers:  async(req = request , res = response) =>{ 
            
           const{ limit = 5 ,  desde = 0  }  = req.query;
           const query = { estado:true };        
           
           const [users, total] = await Promise.all([
              User.find(query)
                         .skip( Number(desde))
                         .limit(Number(limit)),
              User.countDocuments(query),           
           ])


           if( users.length ===  Number(limit) ){
               res.status(200).json({ total:total , users:users });
           }else{
               res.status(402).json({ok:false , msg:'los usuarios resividos no fueron lo esperados verifique su querys'});
           }

     },

    CreateUser: async (req = request , res = response) =>{
           
        try {

            const {google , estado , ...rest} = req.body

            const NewUser = new User(rest);
            await NewUser.save(); 
    
            res.json({
                NewUser
            })
            
        } catch (error) {
            console.log(error);
            res.status(401).status(401).json({
                ok:false,
                msg:'ERROR en el servidor espere'
            })
        }
    },

    Login:(req = request, res = response) =>{
        
        //se optiene los valores pasados por la url que son necesarios para que la ruta funciones o no
        const { id } =  req.params;
   
        res.json({
             msg:'Se hizo el put',
             id
         })
        },
         
    putUser: async (req =  request ,  res = response ) =>{
         
        const { id } = req.params;
        const { email , password, _id  , ...rest} = req.body;
        
        if( password){
            const salt =  bcrypt.genSaltSync();
            const enctypt = bcrypt.hashSync(password , salt);
          
            rest.password = enctypt; 
        }
        
        const UserUP = await User.findByIdAndUpdate( id , rest , {new:true} );
           
        res.status(200).json({
             userUp:UserUP
        })
    }, 


    deleteUsers: async(req , res = response) =>{
      const {id} = req.params;
      
      const Delet = await User.findByIdAndUpdate(id, {estado: false},{new:true});
      const info = req.info;
      const userPeticion = req.userPeticion;


      res.status(200).json({Delet, info , userPeticion});
    }
}


module.exports = {ControllersUsers};



// getUseres:(req , res =  response) =>{
    
    //     //optenemos parametros  que pueden o no ser requeridos para que la ruta funciones
    //      const {q , limti =10 , page = 1} = req.query
    
    //      res.json({
        //          msj:'Se hizo el get',
        //          q,
        //          limti,
        //          page
        //      })
        // },
        
        //optnemos el los datos enviados por la peticion
        //const {name ,  password} = req.body