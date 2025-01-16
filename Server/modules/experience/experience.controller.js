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
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }


}

export default new ExperienceController();