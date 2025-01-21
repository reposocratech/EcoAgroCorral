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
}

export default new ReservationDal();