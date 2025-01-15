import { executeQuery, dbPool } from "../../config/db.js"

class UserDal {
  findUserByEmail = async (email) =>{
    
    try {
      let sql = 'SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0 AND user_is_disabled = 0';
      const result = await executeQuery(sql, [email]);
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  getUserById = async (user_id) =>{
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0 AND user_is_disabled = 0';
      const user = await executeQuery(sql, [user_id]);
      return user
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDal();