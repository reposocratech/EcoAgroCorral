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
}

export default new ExperienceDal();