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

  editExperience = async (experience_id, data) => {
    try {
      let sqlUpdate = `UPDATE experience
                        SET experience_title = ?, experience_description = ?, experience_price_adult = ?, experience_price_child = ?
                        WHERE experience_id = ?`;
      let updateValues = [data.experience_title, data.experience_description, data.experience_price_adult, data.experience_price_child, experience_id];
      let res = await executeQuery(sqlUpdate, updateValues);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  addFeature = async (experienceId, featureInfo, icon) => {
    //console.log("featureInfo", featureInfo);
    try {
      let sqlFeatures = `INSERT INTO feature 
                          (feature_experience_id, feature_name, feature_description, feature_icon) 
                          VALUES (?, ?, ?, ?)`;
      let featuresValues = [experienceId, ...featureInfo, icon.filename];
      //console.log(featureInfo);
      let resFeatures = await executeQuery(sqlFeatures, featuresValues);
      return resFeatures;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  editFeature = async (featureId, featureInfo, icon) => {
    //console.log("featureInfo", featureInfo);
    try {
      let sqlFeatures = `UPDATE feature SET feature_name = ?, feature_description = ? WHERE feature_id = ?`;
      let featuresValues = [...featureInfo, featureId];
      if (icon){
        sqlFeatures = `UPDATE feature SET feature_name = ?, feature_description = ?, feature_icon = ? WHERE feature_id = ?`;
         featuresValues = [...featureInfo, icon.filename, featureId];
      }
      
      //console.log(featureInfo);
      let resFeatures = await executeQuery(sqlFeatures, featuresValues);
      return resFeatures;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  deleteFeature = async (featureId) => {
    try {
      let sql = `DELETE FROM feature WHERE feature_id = ?`;
      let values = [featureId];
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }

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
      let sql = `SELECT experience.experience_id, experience.experience_title, experience.experience_description, experience.experience_price_adult, experience.experience_price_child, experience_pictures.experience_pictures_id,
                        experience_pictures.experience_pictures_file, experience_pictures.is_main,
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

  addMainPicture = async (experience_id, file) => {
    try {
      let sqlInsertMainPic = `INSERT INTO experience_pictures (experience_pictures_experience_id, experience_pictures_file, is_main) 
                  VALUES (?, ?, ?)`;
      let valuesInsertMainPic = [experience_id, file.filename, 1];
      let res = await executeQuery(sqlInsertMainPic, valuesInsertMainPic);
      return res;
    } catch (error) {
      throw error;
    }
  }

  addImagesByExperience = async (experience_id, images) => {
    const connexion = await dbPool.getConnection();
    try {
      await connexion.beginTransaction();

      //console.log(result);
      for (const img of images){

        let sqlNormalImg = `INSERT INTO experience_pictures (experience_pictures_experience_id, experience_pictures_file)
                            VALUES (?, ?)`;
        let values = [experience_id, img.filename];
        await connexion.execute(sqlNormalImg, values);
      }

      let sqlNewImages = `SELECT experience_pictures_id, experience_pictures_file FROM experience_pictures WHERE experience_pictures_experience_id = ? AND is_main = ?`
      let newImagesValues = [experience_id, 0];
      let result = await connexion.execute(sqlNewImages, newImagesValues);

      await connexion.commit();
      return result;
    } catch (error) {
      console.log(error);
      await connexion.rollback();
    } finally{
      connexion.release();
    }
  }

  deletePicture = async (picture_id) => {
    try {
      let sql = `DELETE FROM experience_pictures WHERE experience_pictures_id = ?`;
      let values = [picture_id];
      let res = await executeQuery(sql, values);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export default new ExperienceDal();