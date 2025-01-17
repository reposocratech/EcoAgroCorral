import { executeQuery, dbPool } from "../../config/db.js";

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

  changePassword = async (hash, user_id)=>{
    console.log("passss new", hash);
    
    try {
      let sql = 'UPDATE user SET user_password = ? WHERE user_id = ? AND user_is_deleted = 0 AND user_is_disabled = 0 AND user_is_verified = 1';
      const result = await executeQuery(sql, [hash, user_id]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }  
  }

  editUser = async (data, file) => {
    const { user_name, user_lastname, user_address, user_phone, user_birthdate, user_id } = data;
    
    console.log("Datos para actualizar en el DAL:", { user_name, user_lastname, user_address, user_phone, user_birthdate, user_id });

    try {
        let sql = `
            UPDATE user 
            SET user_name = ?, user_lastname = ?, user_address = ?, user_phone = ?, user_birthdate = ?
            WHERE user_id = ?
        `;
        let values = [user_name, user_lastname, user_address, user_phone, user_birthdate, user_id];

        if (file) {
            sql = `
                UPDATE user 
                SET user_name = ?, user_lastname = ?, user_address = ?, user_phone = ?, user_birthdate = ?, user_avatar = ?
                WHERE user_id = ?
            `;
            values = [user_name, user_lastname, user_address, user_phone, user_birthdate, file.filename, user_id];
        }

        const result = await executeQuery(sql, values);
        console.log("Resultado de la consulta en DAL:", result);
        return result;
    } catch (error) {
        console.error("Error en el DAL editUser:", error);
        throw error;
    }
  };  
}

export default new UserDal();