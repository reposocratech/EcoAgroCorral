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


}

export default new ExperienceController();