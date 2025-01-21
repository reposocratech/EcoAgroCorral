import { executeQuery, dbPool } from "../../config/db.js";

class AdminDal {
  getAllUsers = async () => {
    try {
      let sql = "SELECT * FROM user WHERE user_type = 0";
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };

  enableUser = async (id) => {
    try {
      const sql = "UPDATE user SET user_is_deleted = 0 WHERE user_id = ?";
      await executeQuery(sql, [id]);
    } catch (error) {
      throw error;
    }
  };

  disableUser = async (id) => {
    try {
      const sql = "UPDATE user SET user_is_deleted = 1 WHERE user_id = ?";
      await executeQuery(sql, [id]);
    } catch (error) {
      throw error;
    }
  };

  getAllReservations = async () => {
    try {
      let sql = `
      SELECT 
        reservation.*,
        hike.hike_title,
        experience.experience_title,
        user.user_name,
        user.user_lastname,
        user.user_email
      FROM 
        reservation, hike, experience, user
      WHERE 
        reservation.reservation_hike_id = hike.hike_id
        AND reservation.reservation_experience_id = experience.experience_id
        AND reservation.reservation_user_id = user.user_id
      ORDER BY 
        reservation.reservation_date ASC, 
        reservation.reservation_time ASC;
    `;    

      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      throw error;
    }
  };

  cancelReservation = async (id) => {
    try {
      const sql = "DELETE FROM reservation WHERE reservation_id = ?";
      await executeQuery(sql, [id]);
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      throw error;
    }
  };
}

export default new AdminDal();
