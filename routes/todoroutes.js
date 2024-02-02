import express from "express"
import multer from 'multer';


import { todoshow,todocreate ,register,login,upload,dashboard,deletepod,fav,favshow,deletefav,logout} from '../controllers/todocontrollers.js';

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, '../frontend/my-app/src/components/images2/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload2 = multer({ storage: storage })

  
//get specific events

router.get('/podcast',todoshow)
router.get('/dashboard',dashboard)
router.post('/', upload2.fields([{name:"thumbnail"},{name:"source"}]),todocreate)
router.post('/register',register)
router.post('/login',login)
router.patch('/upload',upload)
router.delete('/delete',deletepod)
router.post('/fav',fav)
router.get('/fav',favshow)
router.delete('/fav',deletefav)
router.delete('/logout',logout)
export{router}
