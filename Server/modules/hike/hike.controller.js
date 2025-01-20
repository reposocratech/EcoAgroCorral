import HikeDal from "./hike.dal.js";

class HikeController {
  createHike = async (req, res) => {
    try {
      console.log('Body:', req.body);
    console.log('File:', req.files);
    
    const { hike_title, hike_description, hike_distance, hike_duration, hike_itinerary } = req.body;
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
        hike_itinerary,
        files
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
      console.log('Resultado:', result);
      
      res.status(200).json({ message: "Hike created successfully" , hikeId: result.hikeId});
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
        console.log('Images added to hike with ID:', id);
        res.status(200).json({ message: "Images added successfully" });
    } catch (error) {
        console.error('Error adding images:', error);
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
      console.log('Images added to hike with ID:', id);
      res.status(200).json({ message: "Images added successfully" });
  } catch (error) {
      console.error('Error adding images:', error);
      res.status(400).json({ error: error.message });
  }
};

deleteHikeImageById = async (req, res) => {
    try {
        const { imageId } = req.params;
        await HikeDal.deleteHikeImageById(imageId);
        console.log('Image deleted with ID:', imageId);
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: error.message });
    }
};

updateHike = async (req, res) => {
    try {
        console.log('Updating hike with ID:', req.params.id);
        const { id } = req.params;
        const { hike_title, hike_description, hike_distance, hike_duration, hike_itinerary } = req.body;
        const files = req.files; 
        if (!hike_title || !hike_description || !hike_distance || !hike_duration || !hike_itinerary) {
            throw new Error("All fields must be filled");
        }
        const dataToDal = { hike_title, hike_description, hike_distance, hike_duration, hike_itinerary, files };
        await HikeDal.updateHike(id, dataToDal);
        console.log('Hike updated successfully:', id);
        res.status(200).json({ message: "Hike updated successfully" });
    } catch (error) {
        console.error('Error updating hike:', error);
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
}

export default new HikeController();
