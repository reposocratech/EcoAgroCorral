import { dbPool, executeQuery } from "../../config/db.js";

class ExperienceDal {

  addExperience = async (data, images, iconFiles, features) => {

    const connexion = await dbPool.getConnection();
    try {
      await connexion.beginTransaction();

      let sqlExperience = `INSERT INTO experience (experience_title, experience_description, experience_price_adult, experience_price_child)
                            VALUES (?, ?, ?, ?)`;
      let result =  await connexion.execute(sqlExperience, data);
      //console.log(result);
      let experience_id = result[0].insertId;
      for (const img of images){
        let sqlMainImg = `INSERT INTO experience_pictures (experience_pictures_experience_id, experience_pictures_file, is_main)
                          VALUES (?, ?, ?)`;

        let sqlNormalImg = `INSERT INTO experience_pictures (experience_pictures_experience_id, experience_pictures_file)
                            VALUES (?, ?)`;
        let values = [experience_id, img.filename];
        if (img.fieldname === 'singleFile'){
          values.push(1);
          await connexion.execute(sqlMainImg, values);
        }
        else{
          await connexion.execute(sqlNormalImg, values);
        }
      }

      console.log("feature", features);
      for (const feature of features){
        let iconFilename = iconFiles.find((e)=> e.originalname === feature.feature_icon).filename;
        let sqlFeatures = `INSERT INTO feature (feature_experience_id, feature_name, feature_description, feature_icon)
                            VALUES (?, ?, ?, ?)`;
        let featureValues = [experience_id, feature.feature_name, feature.feature_description, iconFilename];

        await connexion.execute(sqlFeatures, featureValues);
      }

      await connexion.commit();
    } catch (error) {
      console.log(error);
      await connexion.rollback();
    } finally{
      connexion.release();
    }
  }

  /* addFeature = async (featureInfo) => {
    console.log("featureInfo", featureInfo);
    try {
      let sqlFeatures = `INSERT INTO feature 
                          (feature_experience_id, feature_name, feature_description, feature_icon) 
                          VALUES (?, ?, ?, ?)`;
      let featuresValues = [featureInfo.experience_id, featureInfo.feature_name, featureInfo.feature_description, featureInfo.file.filename];
      let resFeatures = await executeQuery(sqlFeatures, featuresValues);
    } catch (error) {
      console.log(error);
      throw error;
    }
  } */

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
      console.log(result);
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