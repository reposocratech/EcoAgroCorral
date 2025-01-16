import { executeQuery } from "../../config/db.js";

class UserDal {
  register = async (values)=>{
    try {
      let sql = "INSERT INTO user (user_name, user_lastname, user_birthdate, user_email, user_address, user_phone, user_dni, user_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      const result = await executeQuery(sql, values);
            
    } catch (error) {
      throw error
    }
  }

  findUserByEmail = async (email) =>{
    try {
      let sql = 'SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0 AND user_is_disabled = 0';
      const result = await executeQuery(sql, [email]);
      return result;

    } catch (error) {
      throw error;
    }
  }

  validateUser = async (email) =>{
    try {
      let sql = 'UPDATE user SET user_is_verified = 1 WHERE user_email = ?';
      const result = await executeQuery(sql, [email]);
      return result

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new UserDal();