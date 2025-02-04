import experienceDal from "./experience.dal.js";

class ExperienceController {

  addExperience = async (req, res) => {
    try {
      const {
        experience_title,
        experience_description,
        experience_price_child,
        experience_price_adult,
        features
      } = JSON.parse(req.body.data);
      let data = [experience_title, experience_description, experience_price_adult, experience_price_child];
      const {singleFile, multipleFiles, feature_icon} = req.files;
  
      let images = [...singleFile, ...multipleFiles];
      
  
      await experienceDal.addExperience(data, images, feature_icon, features);
      res.status(200).json("experience added");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  editExperience = async (req, res) => {
    const {id} = req.params;
    try {
      const {
        experience_title,
        experience_description,
        experience_price_child,
        experience_price_adult
      } = req.body;
      if(!experience_title || !experience_description || !experience_price_adult || !experience_price_child){
        throw new Error("Todos los campos de textos deben ser cumplimentados");
      }

      await experienceDal.editExperience(id, req.body);
      res.status(200).json("experience edited");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  disableExperience = async (req, res) => {
    const { id } = req.params;
    try {
      await experienceDal.disableExperience(id);
      res.status(200).json({ message: "Experiencia deshabilitada exitosamente." });
    } catch (error) {
      console.error("Error al deshabilitar experiencia:", error);
      res.status(500).json({ message: "Error al deshabilitar la experiencia." });
    }
  };

  addFeatures = async (req, res) => {
    const {expId} = req.params;
    try {
      const {
        feature_name,
        feature_description,
        feature_icon
      } = JSON.parse(req.body.data);

      const dataToDal = [feature_name, feature_description];
      if (!feature_name ||
          !feature_description ||
          !feature_icon){
        throw new Error("Debes cumplimentar todos los campos");
      }
      const file = req.file;
      await experienceDal.addFeature(expId, dataToDal, file);
      res.status(200).json("feature added");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  editFeatures = async (req, res) => {
    const {featureId} = req.params;
    try {
      const {
        feature_name,
        feature_description,
        feature_icon
      } = JSON.parse(req.body.data);

      const dataToDal = [feature_name, feature_description];
      if (!feature_name ||
          !feature_description ||
          !feature_icon){
        throw new Error("Debes cumplimentar todos los campos");
      }
      const file = req.file;
      await experienceDal.editFeature(featureId, dataToDal, file);
      res.status(200).json("feature edited");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  deleteFeature = async (req, res) => {
    const {featureId} = req.params;
    const {icon} = req.body;
    
    try{
      await experienceDal.deleteFeature(featureId, icon);
      res.status(200).json("done");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  getAllExperiences = async (req, res) => {
    try {
      let experiences = await experienceDal.getAllExperiences();
      //console.log(experiences);
      res.status(200).json(experiences);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  getOneExperience = async (req, res) => {
    const {id} = req.params;

    try {
      let response = await experienceDal.getOneExperience(id);
      let experienceData = {};
      let feature = {};
      let features = [];
      let hike = {};
      let hikes = [];
      let experiencePicture = {};
      let experiencePictures = [];

      let previousExpPictureId = null;
      let previousFeatureIds = [];
      let previousHikeIds = [];

      response.forEach((elem) => {
        if(elem.experience_pictures_id && elem.experience_pictures_id !== previousExpPictureId){
          experiencePicture = {
            experience_pictures_id: elem.experience_pictures_id,
            experience_pictures_file: elem.experience_pictures_file,
            is_main: elem.is_main
          }
          experiencePictures.push(experiencePicture);
          previousExpPictureId = elem.experience_pictures_id;
        }

        if(elem.feature_id && !previousFeatureIds.includes(elem.feature_id)){
          feature = {
            feature_id: elem.feature_id,
            feature_name: elem.feature_name,
            feature_description: elem.feature_description,
            feature_icon: elem.feature_icon
          }
          features.push(feature);
          previousFeatureIds.push(elem.feature_id);
        }

        if(elem.hike_id && !previousHikeIds.includes(elem.hike_id)){
          hike = {
            hike_id: elem.hike_id,
            title: elem.hike_title,
            description: elem.hike_description,
            distance: elem.hike_distance,
            duration: elem.hike_duration,
            itinerary: elem.hike_itinerary,
            picture_id: elem.hike_pictures_id,
            picture_file: elem.hike_pictures_file,
          }
          hikes.push(hike);
          previousHikeIds.push(elem.hike_id);
        }

        experienceData = {
          experience: {
            experience_id: response[0].experience_id,
            experience_title: response[0].experience_title,
            experience_description: response[0].experience_description,
            experience_price_adult: response[0].experience_price_adult,
            experience_price_child: response[0].experience_price_child
          },
          features,
          experiencePictures,
          hikes
        } 
      })
      res.status(200).json(experienceData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  addMainPicture = async (req, res) => {
    const {id} = req.params;
    try {
      const result = await experienceDal.addMainPicture(id, req.file);
      let response = {
        experience_pictures_file: req.file.filename,
        experience_pictures_id : result.insertId
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  addImagesByExperience = async (req, res) => {
    const {id} = req.params;
    try {
      const result = await experienceDal.addImagesByExperience(id, req.files);
      res.status(200).json(result[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  deletePicture = async (req, res) => {
    const {id} = req.params;
    const {filename} = req.body;
    try {
      const result = await experienceDal.deletePicture(id, filename);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  getAllOtherHikes = async (req, res) => {
    const {expId} = req.params;
    try {
      const result = await experienceDal.getAllOtherHikes(expId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  assignHike = async (req, res) => {
    const {expId} = req.params;
    const {hikeId} = req.body;
    try {
      let result = await experienceDal.assignHike(expId, hikeId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  unassignHike = async (req, res) => {
    const {expId} = req.params;
    const {hikeId} = req.body;
    try {
      let result = await experienceDal.unassignHike(expId, hikeId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default new ExperienceController();