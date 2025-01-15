import HikeDal from "./hike.dal.js";

class HikeController {
  createHike = async (req, res) => {
    try {
      console.log('Body:', req.body);
    console.log('File:', req.files);
    
    const { hike_title, hike_description, hike_distance, hike_duration, hike_intinerary } = req.body;
    const files = req.files; 
    console.log('Archivos recibidos:', files);
    console.log(files.length);
    if (!files || files.length === 0) {
      throw new Error("At least one image must be uploaded");
    }
      const dataToDal = {
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_intinerary,
        files
      };

      if (
        !hike_title ||
        !hike_description ||
        !hike_distance ||
        !hike_duration ||
        !hike_intinerary
      ) {
        throw new Error("All text fields must be filled");
      }
    
      // Validamos que al menos una imagen haya sido subida
     

      const result = await HikeDal.createHikeWithImages(dataToDal);

      res.status(200).json({ message: "Hike created successfully" });
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

  updateHike = async (req, res) => {
    try {
      const { id } = req.params;
      const { hike_title, hike_description, hike_distance, hike_duration, hike_intinerary } = req.body;
      const files = req.files;  // Obtenemos los archivos subidos
      console.log('Archivos recibidos:', files); 
      // Validamos que todos los campos de texto estén completos
      if (
        !hike_title ||
        !hike_description ||
        !hike_distance ||
        !hike_duration ||
        !hike_intinerary
      ) {
        throw new Error("All fields must be filled");
      }
  
      // Si hay archivos (imágenes) subidos, los incluimos en los datos
      const dataToDal = {
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_intinerary,
        files // Incluimos los archivos para la gestión de las imágenes
      };
  
      // Actualizamos el hike con los nuevos datos y las imágenes
      const result = await HikeDal.updateHike(id, dataToDal);
  
      res.status(200).json({ message: "Hike updated successfully" });
    } catch (error) {
      console.error(error);
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
}

export default new HikeController();
