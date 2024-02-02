import mongoose from 'mongoose';

const Schema = mongoose.Schema

const todoSchema = new Schema({

    
        
        title: {type:String,
        required:true},

        user: {type:String,
                required:true},

        desc: { type:String,
                required:true},

        tags: { type:String,
        required:true},

       thumbnail: {type:String,
                required:true},

        source: { type:String,
                required:true},

       },
       {
        timestamps: true,
    }
       )
          
        
        
      




    

       const todo = mongoose.model("podcast", todoSchema);

       export default todo
