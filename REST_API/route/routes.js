import { getAllTodos } from "../model/database";
import app from "../server";
const router = express.Router()

router.get('/all',async (req,res)=>{
    
    res.send(await getAllTodos())
})