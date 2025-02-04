import { executeQuery } from "../../config/db.js";

class AdminDal {
  getAllUsers = async (page = 1, limit = 15) => {
    try {
      const offset = (page - 1) * limit;

      const sql = `
        SELECT * 
        FROM user 
        WHERE user_type = 0
        ORDER BY 
          user.user_name ASC, 
          user.user_lastname ASC
        LIMIT ? OFFSET ?;
      `;

      const countSql = `
        SELECT COUNT(*) AS total 
        FROM user 
        WHERE user_type = 0;
      `;

      const users = await executeQuery(sql, [limit, offset]);
      const totalResult = await executeQuery(countSql);

      return {
        users,
        totalPages: Math.ceil(totalResult[0].total / limit),
      };
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
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

  getAllReservations = async (page = 1, limit = 15, pastOnly = false) => {
    try {
      const offset = (page - 1) * limit;
      const today = new Date().toISOString().split("T")[0];

      const whereCondition = pastOnly
        ? `WHERE reservation.reservation_date < '${today}'`
        : `WHERE reservation.reservation_date >= '${today}'`;

      const sql = `
        SELECT 
          reservation.*,
          hike.hike_title,
          experience.experience_title,
          user.user_name,
          user.user_lastname,
          user.user_email
        FROM 
          reservation
        JOIN hike ON reservation.reservation_hike_id = hike.hike_id
        JOIN experience ON reservation.reservation_experience_id = experience.experience_id
        JOIN user ON reservation.reservation_user_id = user.user_id
        ${whereCondition}
        ORDER BY 
          reservation.reservation_date ASC
        LIMIT ? OFFSET ?;
      `;

      const countSql = `
        SELECT COUNT(*) AS total 
        FROM reservation
        ${whereCondition};
      `;

      const reservations = await executeQuery(sql, [limit, offset]);
      const totalResult = await executeQuery(countSql);

      return {
        reservations,
        totalPages: Math.ceil(totalResult[0].total / limit),
      };
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      throw error;
    }
  };

  getReservationById = async (id) => {
    try {
      let sql = `
        SELECT 
          reservation.reservation_date, 
          hike.hike_title, 
          user.user_email, 
          user.user_name 
        FROM reservation
        JOIN user ON reservation.reservation_user_id = user.user_id
        JOIN hike ON reservation.reservation_hike_id = hike.hike_id
        WHERE reservation_id = ?;
      `;
      const result = await executeQuery(sql, [id]);
      console.log("Datos de la reserva obtenidos:", result);
      return result[0];
    } catch (error) {
      console.error("Error al obtener datos de la reserva:", error);
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

  getAllExperiences = async (page = 1, limit = 15) => {
    const offset = (page - 1) * limit;

    const sql = `
      SELECT * 
      FROM experience 
      ORDER BY experience_title ASC
      LIMIT ? OFFSET ?;
    `;
    const countSql = `
      SELECT COUNT(*) AS total 
      FROM experience;
    `;

    const experiences = await executeQuery(sql, [limit, offset]);
    const totalResult = await executeQuery(countSql);

    return {
      experiences,
      totalPages: Math.ceil(totalResult[0].total / limit),
    };
  };

  enableExperience = async (id) => {
    const sql = "UPDATE experience SET experience_is_deleted = 0 WHERE experience_id = ?";
    await executeQuery(sql, [id]);
  };

  disableExperience = async (id) => {
    const sql = "UPDATE experience SET experience_is_deleted = 1 WHERE experience_id = ?";
    await executeQuery(sql, [id]);
  };
}

export default new AdminDal();
