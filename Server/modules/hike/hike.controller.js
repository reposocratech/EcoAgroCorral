import HikeDal from "./hike.dal.js";

class HikeController {
  createHike = async (req, res) => {
    try {
      console.log("Body:", req.body);
      console.log("File:", req.files);

      const {
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_itinerary,
      } = req.body;
      const files = req.files;
      console.log("Archivos recibidos:", files);
      console.log(files.length);
      if (!files || files.length === 0) {
        throw new Error("At least one image must be uploaded");
      }
      const dataToDal = {
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_itinerary,
        files,
      };

      if (
        !hike_title ||
        !hike_description ||
        !hike_distance ||
        !hike_duration ||
        !hike_itinerary
      ) {
        throw new Error("All text fields must be filled");
      }

      // Validamos que al menos una imagen haya sido subida

      const result = await HikeDal.createHikeWithImages(dataToDal);
      console.log("Resultado:", result);

      res
        .status(200)
        .json({ message: "Hike created successfully", hikeId: result.hikeId });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  getHikeById = async (req, res) => {
    try {
      const hike = await HikeDal.getHikeById(req.params.id);
      if (!hike) return res.status(404).json({ message: "Hike not found" });
      res.json(hike);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteHike = async (req, res) => {
    try {
      await HikeDal.deleteHike(req.params.id);
      res.json({ message: "Hike deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  restoreHike = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await HikeDal.restoreHike(id);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Hike not found or already active" });
      }

      res.status(200).json({ message: "Hike restored successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  addHikeImages = async (req, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      if (!files || files.length === 0) {
        throw new Error("At least one image must be uploaded");
      }
      await HikeDal.addHikeImages(id, files);
      console.log("Images added to hike with ID:", id);
      res.status(200).json({ message: "Images added successfully" });
    } catch (error) {
      console.error("Error adding images:", error);
      res.status(400).json({ error: error.message });
    }
  };
  addHikeMainImage = async (req, res) => {
    try {
      const { id } = req.params;
      const files = req.files;
      if (!files || files.length === 0) {
        throw new Error("At least one image must be uploaded");
      }
      await HikeDal.addHikeMainImage(id, files);
      console.log("Images added to hike with ID:", id);
      res.status(200).json({ message: "Images added successfully" });
    } catch (error) {
      console.error("Error adding images:", error);
      res.status(400).json({ error: error.message });
    }
  };

  deleteHikeImageById = async (req, res) => {
    try {
      const { imageId } = req.params;
      await HikeDal.deleteHikeImageById(imageId);
      console.log("Image deleted with ID:", imageId);
      res.json({ message: "Image deleted successfully" });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: error.message });
    }
  };

  updateHike = async (req, res) => {
    try {
      console.log("Updating hike with ID:", req.params.id);
      const { id } = req.params;
      const {
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_itinerary,
      } = req.body;
      const files = req.files;
      if (
        !hike_title ||
        !hike_description ||
        !hike_distance ||
        !hike_duration ||
        !hike_itinerary
      ) {
        throw new Error("All fields must be filled");
      }
      const dataToDal = {
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_itinerary,
        files,
      };
      await HikeDal.updateHike(id, dataToDal);
      console.log("Hike updated successfully:", id);
      res.status(200).json({ message: "Hike updated successfully" });
    } catch (error) {
      console.error("Error updating hike:", error);
      res.status(400).json({ error: error.message });
    }
  };

  getAllHikes = async (req, res) => {
    try {
      const hikes = await HikeDal.getAllHikes();
      res.status(200).json(hikes);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };
  getAllDelHikes = async (req, res) => {
    try {
      const hikes = await HikeDal.getAllDelHikes();
      res.status(200).json(hikes);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };
  getExperiencesByHike = async (req, res) => {
    const { hikeId } = req.params;

    try {
      const experiences = await HikeDal.getExperiencesByHikeId(hikeId);

      if (!experiences.length) {
        return res
          .status(404)
          .json({ message: "No experiences found for this hike" });
      }

      res.status(200).json(experiences);
    } catch (error) {
      console.error("Error fetching experiences for hike:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  };
  // Asignar o cambiar experiencias de un hike
  assignExperienceToHike = async (req, res) => {
    const { hikeId, experienceId } = req.params; // Obtener los IDs de los parámetros

    console.log("Assigning experience to hike:", { hikeId, experienceId });

    // Validar los parámetros
    if (!hikeId || !experienceId) {
      return res
        .status(400)
        .json({ error: "hikeId and experienceId are required" });
    }

    try {
      // Asignar la experiencia al hike
      await HikeDal.assignExperienceToHike(hikeId, experienceId);

      res.status(200).json({ message: "Experience assigned successfully" });
    } catch (error) {
      console.error("Error assigning experience to hike:", error.message);
      res.status(500).json({ error: "Failed to assign experience to hike" });
    }
  };

  removeExperienceFromHike = async (req, res) => {
    const { hikeId, experienceId } = req.params;

    if (!hikeId || !experienceId) {
      return res
        .status(400)
        .json({ error: "hikeId and experienceId are required" });
    }

    try {
      const result = await HikeDal.removeExperienceByHikeId(
        hikeId,
        experienceId
      );

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Experience not found for the specified hike" });
      }

      res.status(200).json({ message: "Experience removed successfully" });
    } catch (error) {
      console.error("Error removing experience from hike:", error.message);
      res.status(500).json({ error: "Failed to remove experience from hike" });
    }
  };
  assignExperiencesToHike = async (req, res) => {
    const { hikeId } = req.params;
    const { experienceIds } = req.body; // Esperamos un array de IDs de experiencias

    console.log("Body:", req.body);
    console.log("Assigning experiences to hike with ID:", hikeId);

    // Verificar que 'experienceIds' sea un array
    if (!Array.isArray(experienceIds)) {
      return res.status(400).json({ error: "experienceIds must be an array" });
    }

    try {
      // Llamar al DAL para asignar las experiencias al hike
      const result = await HikeDal.assignExperiencesToHike(
        hikeId,
        experienceIds
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(
        "Error in controller while assigning experiences to hike:",
        error
      );
      res.status(500).json({ error: "Failed to assign experiences" });
    }
  };
  deleteExperiencesFromHike = async (req, res) => {
    const { hikeId } = req.params;
    const { experienceIds } = req.body; // Esperamos un array de IDs de experiencias a eliminar

    console.log("Body:", req.body);
    console.log("Removing experiences from hike with ID:", hikeId);

    // Verificar que 'experienceIds' sea un array
    if (!Array.isArray(experienceIds)) {
      return res.status(400).json({ error: "experienceIds must be an array" });
    }

    try {
      // Llamar al DAL para eliminar las experiencias del hike
      const result = await HikeDal.removeExperiencesFromHike(
        hikeId,
        experienceIds
      );

      // Si el DAL devuelve algo que indica que no se eliminaron experiencias
      if (!result) {
        return res.status(404).json({ error: "No experiences found to remove" });
      }

      // Devolver la respuesta si la eliminación fue exitosa
      res.status(200).json({ message: "Experiences removed successfully", removedExperiences: result });
    } catch (error) {
      console.error(
        "Error in controller while removing experiences from hike:",
        error
      );
      res.status(500).json({ error: "Failed to remove experiences" });
    }
};
getExperiencesUnassigned = async (req, res) => {
  const { hikeId } = req.params; // `hikeId` también viene de los parámetros de la ruta
  try {
    const unassignedExperiences = await HikeDal.getUnassignedExperiencesByHikeId(hikeId);
    res.status(200).json(unassignedExperiences);
  } catch (error) {
    console.error("Error fetching unassigned experiences:", error);
    res.status(500).json({ error: "Failed to fetch unassigned experiences" });
  }
};
}

export default new HikeController();
