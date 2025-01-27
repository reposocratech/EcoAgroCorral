import { executeQuery, dbPool } from "../../config/db.js";

class UserDal {
  register = async (values) => {
    try {
      let sql =
        "INSERT INTO user (user_name, user_lastname, user_birthdate, user_email, user_address, user_phone, user_dni, user_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const result = await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  findUserByEmail = async (email) => {
    try {
      let sql =
        "SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0 AND user_is_disabled = 0";
      const result = await executeQuery(sql, [email]);

      return result;
    } catch (error) {
      throw error;
    }
  };

  findUserByEmailLogin = async (email) => {
    try {
      let sql =
        "SELECT * FROM user WHERE user_email = ? AND user_is_deleted = 0 AND user_is_disabled = 0 AND user_is_verified = 1";
      const result = await executeQuery(sql, [email]);

      return result;
    } catch (error) {
      throw error;
    }
  };

  validateUser = async (email) => {
    try {
      let sql = "UPDATE user SET user_is_verified = 1 WHERE user_email = ?";
      const result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getUserById = async (user_id) => {
    try {
      let sql =
        "SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0 AND user_is_disabled = 0";
      const user = await executeQuery(sql, [user_id]);
      return user;
    } catch (error) {
      throw error;
    }
  };

  getHikeById = async (hike_id) => {
    try {
      const sql = `
        SELECT 
          hike_id, 
          hike_title, 
          hike_description, 
          hike_distance, 
          hike_duration, 
          hike_itinerary, 
          hike_is_deleted 
        FROM hike 
        WHERE hike_id = ? AND hike_is_deleted = 0
      `;
      const result = await executeQuery(sql, [hike_id]);
      return result;
    } catch (error) {
      console.error("Error al obtener los datos de la ruta:", error);
      throw error;
    }
  };

  changePassword = async (hash, user_id) => {
    console.log("passss new", hash);

    try {
      let sql =
        "UPDATE user SET user_password = ? WHERE user_id = ? AND user_is_deleted = 0 AND user_is_disabled = 0 AND user_is_verified = 1";
      const result = await executeQuery(sql, [hash, user_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  getReservations = async (user_id) => {
    try {
      let sql = `
      SELECT 
        reservation.*, 
        hike_pictures.hike_pictures_file AS reservation_file, 
        hike.hike_title AS reservation_hike_title, 
        experience.experience_title AS reservation_experience_title 
      FROM reservation
      LEFT JOIN hike_pictures 
          ON reservation.reservation_hike_id = hike_pictures.hike_pictures_hike_id 
          AND hike_pictures.is_main = 1
      LEFT JOIN hike 
          ON reservation.reservation_hike_id = hike.hike_id 
      LEFT JOIN experience 
          ON reservation.reservation_experience_id = experience.experience_id
      WHERE reservation.reservation_user_id = ? 
      ORDER BY reservation.reservation_date`;
      const result = await executeQuery(sql, [user_id]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  editUser = async (data, file) => {
    const {
      user_name,
      user_lastname,
      user_address,
      user_phone,
      user_birthdate,
      user_id,
    } = data;

    console.log("Datos para actualizar en el DAL:", {
      user_name,
      user_lastname,
      user_address,
      user_phone,
      user_birthdate,
      user_id,
    });

    try {
      let sql = `
        UPDATE user 
        SET user_name = ?, user_lastname = ?, user_address = ?, user_phone = ?, user_birthdate = ?
        WHERE user_id = ?
        `;
      let values = [
        user_name,
        user_lastname,
        user_address,
        user_phone,
        user_birthdate,
        user_id,
      ];

      if (file) {
        sql = `
          UPDATE user 
          SET user_name = ?, user_lastname = ?, user_address = ?, user_phone = ?, user_birthdate = ?, user_avatar = ?
          WHERE user_id = ?
          `;
        values = [
          user_name,
          user_lastname,
          user_address,
          user_phone,
          user_birthdate,
          file.filename,
          user_id,
        ];
      }

      const result = await executeQuery(sql, values);
      console.log("Resultado de la consulta en DAL:", result);
      return result;
    } catch (error) {
      console.error("Error en el DAL editUser:", error);
      throw error;
    }
  };

  getExperience = async () => {
    try {
      let sql = `
        SELECT 
          experience.experience_id, 
          experience.experience_title, 
          experience.experience_price_adult,
          experience.experience_price_child, 
          hike.hike_id, hike.hike_title
        FROM experience, hike, hike_experience
        WHERE hike.hike_id = hike_experience.hike_id
        AND experience.experience_id =  hike_experience.experience_id`;
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createReservation = async (
    reservation_experience_id,
    reservation_hike_id,
    reservation_text,
    reservation_date,
    reservation_time,
    reservation_adult,
    reservation_children,
    reservation_total_price,
    reservation_user_id
  ) => {
    try {
      let sql = `INSERT INTO reservation (
      reservation_experience_id,
      reservation_hike_id,
      reservation_text,
      reservation_date,
      reservation_time,
      reservation_adult,
      reservation_children,
      reservation_total_price,
      reservation_user_id) VALUES (?,?,?,?,?,?,?,?,?)`;
      const result = await executeQuery(sql, [
        reservation_experience_id,
        reservation_hike_id,
        reservation_text,
        reservation_date,
        reservation_time,
        reservation_adult,
        reservation_children,
        reservation_total_price,
        reservation_user_id,
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserDal();
