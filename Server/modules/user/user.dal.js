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

  findUserByEmailLogin = async (email) =>{
    
    try {
      let sql = 'SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0 AND user_is_disabled = 0 AND user_is_verified = 1';
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
      throw error;
    }
  }

  getReservations = async (user_id)=>{
    try {
      let sql = 'SELECT reservation.*, hike_pictures.hike_pictures_file as reservation_file, hike.hike_title as reservation_hike_title, experience.experience_title as reservation_experience_title FROM reservation, hike_pictures, hike, experience WHERE reservation_user_id = ? AND reservation.reservation_hike_id = hike_pictures.hike_pictures_hike_id AND hike_pictures.is_main = 1 AND reservation.reservation_hike_id = hike.hike_id AND reservation.reservation_experience_id = experience.experience_id;'
      const result = await executeQuery(sql, [user_id])
      return result
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
}

export default new UserDal();