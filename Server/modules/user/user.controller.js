import { comparePassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import userDal from "./user.dal.js";

class UserController {
  login = async (req, res) =>{
    const {user_email, user_password} = req.body;
    
    try {
      const result = await userDal.findUserByEmail(user_email);
      if(result.length === 0){
        res.status(401).json({message:"El usuario no existe"});
      }else{
        const user = result[0];
        const match = await comparePassword(user_password, user.user_password);
        if(match){
          //generar un token
          const token = generateToken(user.user_id);
          //mandar el token
          res.status(200).json(token);
        }else{
          res.status(401).json({message:"La contraseña es incorrecta"});
        }
      }
    } catch (error) {
      res.status(500).json({message:"Error de server"});
    }
  }

  findUserById = async (req,res) =>{
    const user_id = getIdFromToken(req.token)

    try {
      const resultUser = await userDal.getUserById(user_id);
      res.status(200).json(resultUser[0])
    } catch (error) {
      res.status(500).json({message:"Error de server"});
    }
  }
}

export default new UserController();