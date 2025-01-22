import experienceDal from "./experience.dal.js";

class ExperienceController {

  addExperience = async(req, res) => {
    //console.log("main File", req.files.singleFile);
    //console.log("other Files", req.files.multipleFiles);
    //console.log("feature_icon", req.files.feature_icon);
    //console.log("Bodyyyy", req.body);

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
      res.status(200).json("response");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  /* addFeatures = async (req, res) => {
    try {
      if (req.body.data === 0){
        throw new Error("Debes crear al menos una caracteristica");
      }
      const files = req.files;
      //console.log("files", files);
      console.log("featuire body", req.body.data);
      for(const elem of req.body.data){
        console.log("data elem", elem);
        const{feature_name, feature_description, feature_icon, experience_id} = JSON.parse(elem);
        let file = files.find((value) => {
          return value.filename.endsWith(feature_icon);
        });
        console.log(file)
        const res = await experienceDal.addFeature({feature_name, feature_description, feature_icon, experience_id, file});
      }
      res.status(200).json("response");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } */

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
            picture_id: elem.experience_pictures_id,
            file: elem.experience_pictures_file
          }
          experiencePictures.push(experiencePicture);
          previousExpPictureId = elem.experience_pictures_id;
        }

        if(elem.feature_id && !previousFeatureIds.includes(elem.feature_id)){
          feature = {
            feature_id: elem.feature_id,
            name: elem.feature_name,
            description: elem.feature_description,
            icon: elem.feature_icon
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
            title: response[0].experience_title,
            description: response[0].experience_description
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


}

export default new ExperienceController();