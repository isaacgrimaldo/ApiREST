const {Collection} =  require('mongoose');

const  getCollections = () => {
   
    try {
        const collections =  Collection.find();
     
        return collections;

    } catch (error) {
        console.log(error); 
        throw new Error('ERROR EN EL SERVIDOR'); 
    }
  
}
 
module.exports = getCollections;

