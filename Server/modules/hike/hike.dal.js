import { executeQuery ,dbPool} from "../../config/db.js";

class HikeDal {
  createHikeWithImages = async (data) => {
    const {
      hike_title,
      hike_description,
      hike_distance,
      hike_duration,
      hike_intinerary,
      files
    } = data;
    console.log("DATA", data);
    
    const connection = await dbPool.getConnection();
    try {
        await connection.beginTransaction();

        const sql = `INSERT INTO hike (hike_title, hike_description, hike_distance, hike_duration, hike_intinerary) 
                      VALUES (?, ?, ?, ?, ?)`;
        const [result] = await connection.execute(sql, [
            hike_title,
            hike_description,
            hike_distance,
            hike_duration,
            hike_intinerary
        ]);

        const hikeId = result.insertId;

        if (!files || files.length === 0) {
            throw new Error("At least one image must be uploaded");
        }
        let i=0;
        for (const file of files) {

            const sqlImage = `INSERT INTO hike_pictures (hike_pictures_hike_id, hike_pictures_file, is_main) 
                              VALUES (?, ?, ?)`;
            await connection.execute(sqlImage, [
                hikeId,
                file.filename, 
                i==0?true : false
            ]);
            i++;
        }

        await connection.commit();
        connection.release();
        return { message: "Hike created successfully", hikeId };

    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error("Error during transaction:", error);
        throw error;
    }
};


  

getHikeById = async (hikeId) => {
  try {
    // Primero obtenemos la información del hike
    const sqlHike = "SELECT * FROM hike WHERE hike_id = ?";
    const hikeResult = await executeQuery(sqlHike, [hikeId]);

    // Si no se encuentra el hike, retornamos null
    if (hikeResult.length === 0) {
      return null;
    }

    // Luego obtenemos las imágenes asociadas con el hike
    const sqlImages = "SELECT * FROM hike_pictures WHERE hike_pictures_hike_id = ?";
    const imagesResult = await executeQuery(sqlImages, [hikeId]);

    // Devolvemos el resultado del hike junto con las imágenes asociadas
    const hike = hikeResult[0];
    hike.images = imagesResult; // Añadimos las imágenes al objeto del hike

    return hike;
  } catch (error) {
    throw error;
  }
};

  deleteHike = async (hikeId) => {
    try {
      const sql = "UPDATE hike SET hike_is_deleted = 1 WHERE hike_id = ?";
      await executeQuery(sql, [hikeId]);
    } catch (error) {
      throw error;
    }
  };

  restoreHike = async (hikeId) => {
    try {
      const sql = "UPDATE hike SET hike_is_deleted = 0 WHERE hike_id = ?";
      const result = await executeQuery(sql, [hikeId]);

      if (result.affectedRows === 0) {
        throw new Error("Hike not found or already active");
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  updateHike = async (hikeId, data) => {
    const { hike_title, hike_description, hike_distance, hike_duration, hike_intinerary,files } = data;
    console.log('Archivos recibidos:', files); 
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
  
      // Primero actualizamos los datos del hike
      const sql = `UPDATE hike SET 
                      hike_title = ?, 
                      hike_description = ?, 
                      hike_distance = ?, 
                      hike_duration = ?, 
                      hike_intinerary = ? 
                    WHERE hike_id = ? AND hike_is_deleted = 0`;
      
      const [result] = await connection.execute(sql, [
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_intinerary,
        hikeId
      ]);
  
      // Verificamos si el hike existe
      if (result.affectedRows === 0) {
        throw new Error("Hike not found or already deleted");
      }
  
      // Si hay archivos (imágenes) nuevos, gestionamos las imágenes
      if (files && files.length > 0) {
        // Primero eliminamos las imágenes actuales asociadas con el hike
        const deleteImagesSql = "DELETE FROM hike_pictures WHERE hike_pictures_hike_id = ?";
        await connection.execute(deleteImagesSql, [hikeId]);
  
        // Insertamos las nuevas imágenes
        let i = 0;
        for (const file of files) {
          const sqlImage = `INSERT INTO hike_pictures (hike_pictures_hike_id, hike_pictures_file, is_main) 
                            VALUES (?, ?, ?)`;
          await connection.execute(sqlImage, [
            hikeId,
            file.filename,
            i == 0 ? true : false  // La primera imagen será la principal
          ]);
          i++;
        }
      }
  
      await connection.commit();
      connection.release();
      return { message: "Hike updated successfully", hikeId };
    } catch (error) {
      await connection.rollback();
      connection.release();
      console.error("Error during transaction:", error);
      throw error;
    }
  };
  

  getAllHikes = async () => {
    try {
      const sql = "SELECT * FROM hike WHERE hike_is_deleted = 0";
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default new HikeDal();
