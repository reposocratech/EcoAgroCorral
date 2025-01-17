import { executeQuery } from "../../config/db.js";

class ExperienceDal {
  getAllExperiences = async () => {
    try {
      let sql = `SELECT experience.experience_id,
                        experience. experience_title,
                        experience.experience_description,
                        experience_pictures.experience_pictures_file
                  FROM experience 
                    LEFT JOIN experience_pictures 
                    ON experience_pictures.experience_pictures_experience_id = experience.experience_id AND experience_pictures.is_main = 1
                  WHERE experience.experience_is_deleted = 0;`;
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getOneExperience = async (id) => {

    try {
      let sql = `SELECT experience.experience_id, experience.experience_title, experience.experience_description, experience_pictures.experience_pictures_id,
                        experience_pictures.experience_pictures_file,
                        feature.feature_id, feature.feature_name, feature.feature_description, feature.feature_icon,
                        hike_experience.hike_id,
                        hike.hike_id, hike.hike_title, hike.hike_description, hike.hike_distance, hike.hike_duration, hike.hike_itinerary,hike_pictures.hike_pictures_id, hike_pictures.hike_pictures_file
                        FROM experience 
                          LEFT JOIN experience_pictures ON experience_pictures.experience_pictures_experience_id = experience.experience_id
                          LEFT JOIN feature ON feature.feature_experience_id = experience.experience_id
                          LEFT JOIN hike_experience ON hike_experience.experience_id = experience.experience_id
                          LEFT JOIN hike ON hike.hike_id = hike_experience.hike_id AND hike.hike_is_deleted = 0
                            LEFT JOIN hike_pictures ON hike.hike_id = hike_pictures.hike_pictures_hike_id AND hike_pictures.is_main = 1
                        WHERE experience.experience_is_deleted = 0 and experience.experience_id = ?`;
      let response = await executeQuery(sql, [id]);
      return response;
        
    } catch (error) {
      throw error;
    }
  }
}

export default new ExperienceDal();