import experienceDal from "./experience.dal.js";

class ExperienceController {

    getAllExperiences = async (req, res) => {
      try {
        let experiences = await experienceDal.getAllExperiences();
        console.log(experiences);
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
        let previousFeatureId = null;
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

          if(elem.feature_id && elem.feature_id !== previousFeatureId){
            feature = {
              feature_id: elem.feature_id,
              name: elem.feature_name,
              description: elem.feature_description,
              icon: elem.feature_icon
            }
            features.push(feature);
            previousFeatureId = elem.feature_id;
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