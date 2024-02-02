import mongoose from 'mongoose';

const Schema = mongoose.Schema

const todoSchema = new Schema({

    
  username: {type:String,
    required:true},
        email: {type:String,
        required:true},

       password: {type:String,
                required:true},
       
         favs : { type : Array , "default" : [] },
         uploads : { type : Array , "default" : [] }
       })
          
        
        
      




    

       const user = mongoose.model("user", todoSchema);

       export default user
