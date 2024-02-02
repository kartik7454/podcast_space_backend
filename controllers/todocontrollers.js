

import todo from "../models/todomodels.js"
import User from "../models/user.js"

import session from "../models/sessions.js"





const todoshow= async  (req,res)=>{

try{
    
        const event =await todo.find({}).sort({createdAt:-1})
        res.status(200).json(event)
       
    }
    
 catch(error){res.status(400).json({error:error.message})}

 
    
}

const todocreate= async (req,res)=>{

    if(req.session.isAuth){try{
        
        var imgname = req.files.thumbnail[0].filename
         var src = req.files.source[0].filename
         
          var {title,user,desc,tags,thumbnail,source} = req.body
  thumbnail =  imgname
  source = src
  user =  req.session.username


        const event =  await todo.create({title,user,desc,tags,thumbnail,source})
   

  if(!event){ res.status(400).json({mssg:"error"})}
    
       var id = req.session.user
          const itemExists2 = await User.findOne({ _id:id});

       var old =  itemExists2.uploads
  old.push(event)

           const itemExists = await User.findOneAndUpdate({ _id:id},{uploads:old},{new:true});

        
           res.status(200).json({itemExists})
        
     

    }
     catch(error ){res.status(400).json({error:error.message})}
    }
  else{return res.status(400).json({error:"not logged in"})}
 }




const register= async (req,res)=>{
    const {username,email,password} = req.body
  
 try{

    const itemExists = await User.exists({ email:email });

if (!itemExists){const event =  await User.create({username,email,password})
     res.status(200).json(event)
     
     }
    
else{
    return res.status(400).json({error:"already exist"}) 
}
     
     }
     catch(error){
         res.status(400).json({error:error.message})
     }
}

const login = async (req,res)=>{

    const {email,password} = req.body
  
 try{

    const itemExists = await User.findOne({ email:email,password:password });

if (itemExists){ 
    
    req.session.isAuth=true;
    req.session.user=true;
    req.session.username=true
    req.session.username = itemExists.username
     var id=itemExists._id.toString()
     req.session.user=id;

     res.status(200).json({mssg:req.sessionID})
      
     }
    
     
else{
    return res.status(404).json({error:" does not  exist"}) 
}
     
     }
     catch(error){
         res.status(400).json({error:error.message})
     }
}


const upload= async (req,res)=>{

    try{var id = req.session.user
        const itemExists2 = await User.findOne({ _id:id});
    var old =  itemExists2.uploads
old.push(req.body)


        const itemExists = await User.findOneAndUpdate({ _id:id},{uploads:old},{new:true});

        
        res.status(200).json({itemExists})}
        
     catch(error){res.status(400).json({error:error.message})}
 }



 const dashboard= async (req,res)=>{

    try{var id = req.session.user
        const itemExists2 = await User.findOne({ _id:id});
    var old = [] 
    old =itemExists2.uploads


        

        
        res.status(200).json({old})}
        
     catch(error){res.status(400).json({error:error.message})}
 }



 const deletepod= async (req,res)=>{

    try{var id = req.body.id//element id
   
        const itemExists = await todo.findOneAndDelete({ _id:id});
       
/////////////////////////////////////////
var id2 = req.session.user //users id
        const itemExists2 = await User.findOne({ _id:id2});
var alo = (itemExists2.uploads)

 var newlist = alo.filter((item)=>{ 

    //change item._id
    console.log(id)
    var key =  item._id.toString()
    return key !== id})
    const itemExists3 = await User.findOneAndUpdate({ _id:id2},{uploads:newlist},{new:true});

////////////////////////////////////////////////////


var alo2 = (itemExists2.favs)

 var newlist2 = alo2.filter((item)=>{ 

    //change item._id
    console.log(id)
   
    var key =  item[0]._id.toString()
    return key !== id})
    const itemExists4 = await User.findOneAndUpdate({ _id:id2},{favs:newlist2},{new:true});
        res.status(200).json({"mssg":"deleted"})
    }
        
     catch(error){res.status(400).json({error:error.message})}
 }


 const fav= async (req,res)=>{

    try{
        


        
        
        //users fav
        var id = req.session.user
        const itemExists2 = await User.findOne({ _id:id});
        var old =  itemExists2.favs

        //content
        const event =await todo.find({_id:req.body.id})
        old.push(event)


        const itemExists = await User.findOneAndUpdate({ _id:id},{favs:old},{new:true})

    }
        
     catch(error){res.status(400).json({error:error.message})}
 }

 const favshow= async (req,res)=>{

    try{var id = req.session.user
        const itemExists2 = await User.findOne({ _id:id});
    var old = [] 
    old =itemExists2.favs


        

        
        res.status(200).json({old})}
        
     catch(error){res.status(400).json({error:error.message})}
 }

 const deletefav= async (req,res)=>{

    try{var id = req.body.id//element id
   
        
       
/////////////////////////////////////////
var id2 = req.session.user //users id
        const itemExists2 = await User.findOne({ _id:id2});
var alo = (itemExists2.favs)

 var newlist = alo.filter((item)=>{ 

    //change item._id
    
    var key =  item[0]._id.toString()
    return key !== id})
    const itemExists3 = await User.findOneAndUpdate({ _id:id2},{favs:newlist},{new:true});



        res.status(200).json({"mssg":"deleted"})
    }
        
     catch(error){res.status(400).json({error:error.message})}
 }
  


 const logout= async (req,res)=>{

    try{
        res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.')
    }
    
        
     catch(error){res.status(400).json({error:error.message})}
 }
export{todoshow,todocreate,register,login,dashboard,upload,deletepod,fav,favshow,deletefav,logout}
