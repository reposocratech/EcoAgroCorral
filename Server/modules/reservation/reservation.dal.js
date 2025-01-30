import { executeQuery } from "../../config/db.js";

class ReservationDal {
  getDates = async ()=>{
    try {
      let sql = 'SELECT reservation_date FROM reservation '
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getOneReservation = async (reservation_id)=>{
      try {
        let sql = 'SELECT reservation.*, hike.hike_title as hike_title FROM reservation, hike WHERE reservation_id = ? AND reservation.reservation_hike_id = hike.hike_id'
        const result = await executeQuery(sql, [reservation_id]);
        return result;
      } catch (error) {
        throw error;
      }
  }

  deleteReservation = async (reservation_id)=>{
    try {
      let sql = 'DELETE FROM reservation WHERE reservation_id = ?'
      const result = await executeQuery(sql, [reservation_id]);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  modifyReservation = async (newDate, reservation_id)=>{
    try {
      let sql = 'UPDATE reservation SET reservation_date = ? WHERE reservation_id = ?'
      const result = await executeQuery(sql, [newDate, reservation_id])
      return true;
    } catch (error) {
      throw error;
    }
  }

  setDays = async (values) =>{
    console.log("****", values);
    
    try {
      let sql;
      if(values[0] == 7){
        sql = `UPDATE reservation_day
        SET reservation_day_is_active = 0`
      }
      sql = `UPDATE reservation_day
      SET reservation_day_is_active = 
          CASE 
              WHEN reservation_day_value IN (?) THEN 1
              ELSE 0
          END
      WHERE reservation_day_value IN (0,1, 2, 3, 4, 5, 6)`
      const result = await executeQuery(sql, [values]);

    } catch (error) {
      throw error;
    }
  }

  getDays = async ()=>{
    try {
      let sql = 'SELECT reservation_day_name, reservation_day_value FROM reservation_day WHERE reservation_day_is_active = 1'
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReservationDal();