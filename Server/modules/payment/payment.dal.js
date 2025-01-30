import { executeQuery, dbPool } from "../../config/db.js";

class PaymentDal {
  getNames = async (expId, hikeId) => {
    try {
      let sql = `SELECT experience.experience_title, hike.hike_title 
                  FROM experience, hike
                  WHERE experience.experience_id = ? AND hike.hike_id = ?`;
      let values = [expId, hikeId];
      const res = await executeQuery(sql, values);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new PaymentDal();