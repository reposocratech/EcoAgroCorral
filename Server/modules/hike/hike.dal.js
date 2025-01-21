import { executeQuery, dbPool } from "../../config/db.js";

class HikeDal {
  createHikeWithImages = async (data) => {
    const {
      hike_title,
      hike_description,
      hike_distance,
      hike_duration,
      hike_itinerary,
      files,
    } = data;
    console.log("DATA", data);

    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      const sql = `INSERT INTO hike (hike_title, hike_description, hike_distance, hike_duration, hike_itinerary) 
                      VALUES (?, ?, ?, ?, ?)`;
      const [result] = await connection.execute(sql, [
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_itinerary,
      ]);

      const hikeId = result.insertId;

      if (!files || files.length === 0) {
        throw new Error("At least one image must be uploaded");
      }
      let i = 0;
      for (const file of files) {
        const sqlImage = `INSERT INTO hike_pictures (hike_pictures_hike_id, hike_pictures_file, is_main) 
                              VALUES (?, ?, ?)`;
        await connection.execute(sqlImage, [
          hikeId,
          file.filename,
          i == 0 ? true : false,
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
      const sqlImages =
        "SELECT * FROM hike_pictures WHERE hike_pictures_hike_id = ?";
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
    const {
      hike_title,
      hike_description,
      hike_distance,
      hike_duration,
      hike_itinerary,
    } = data;
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      const sql = `UPDATE hike SET 
                        hike_title = ?, 
                        hike_description = ?, 
                        hike_distance = ?, 
                        hike_duration = ?, 
                        hike_itinerary = ? 
                      WHERE hike_id = ? AND hike_is_deleted = 0`;

      const [result] = await connection.execute(sql, [
        hike_title,
        hike_description,
        hike_distance,
        hike_duration,
        hike_itinerary,
        hikeId,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("Hike not found or already deleted");
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

  // Endpoint para añadir imágenes a un paseo
  addHikeImages = async (hikeId, files) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      // Insertar cada archivo en la base de datos, usando el valor de is_main desde los archivos
      for (const file of files) {
        // Verificar que el archivo tenga un nombre
        if (!file.filename) {
          throw new Error("El archivo no tiene un nombre válido.");
        }

        const fileName = file.filename;
        let isMain = file.is_main;

        // Si is_main no está definido, asignar un valor por defecto (por ejemplo, 0)
        if (isMain === undefined) {
          isMain = 0; // Asignar 0 si no está definido
        }

        // Inserción de la imagen. La base de datos generará automáticamente el hike_pictures_id
        const sqlImage = `INSERT INTO hike_pictures (hike_pictures_hike_id, hike_pictures_file, is_main) 
                        VALUES (?, ?, ?)`;
        await connection.execute(sqlImage, [hikeId, fileName, isMain]);
      }

      // Obtener las imágenes actualizadas
      const sqlNewImages =
        "SELECT * FROM hike_pictures WHERE hike_pictures_hike_id = ?";
      const [result] = await connection.execute(sqlNewImages, [hikeId]);

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      console.error("Error adding images:", error);
      throw error;
    } finally {
      connection.release();
    }
  };

  addHikeMainImage = async (hikeId, files) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      // Insertar cada archivo en la base de datos, usando el valor de is_main desde los archivos
      for (const file of files) {
        // Verificar que el archivo tenga un nombre
        if (!file.filename) {
          throw new Error("El archivo no tiene un nombre válido.");
        }

        const fileName = file.filename;
        let isMain = file.is_main;

        // Si is_main no está definido, asignar un valor por defecto (por ejemplo, 0)
        if (isMain === undefined) {
          isMain = 1; // Asignar 0 si no está definido
        }

        // Inserción de la imagen. La base de datos generará automáticamente el hike_pictures_id
        const sqlImage = `INSERT INTO hike_pictures (hike_pictures_hike_id, hike_pictures_file, is_main) 
                        VALUES (?, ?, ?)`;
        await connection.execute(sqlImage, [hikeId, fileName, isMain]);
      }

      // Obtener las imágenes actualizadas
      const sqlNewImages =
        "SELECT * FROM hike_pictures WHERE hike_pictures_hike_id = ?";
      const [result] = await connection.execute(sqlNewImages, [hikeId]);

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      console.error("Error adding images:", error);
      throw error;
    } finally {
      connection.release();
    }
  };

  // Endpoint para borrar una imagen de un paseo por id
  deleteHikeImageById = async (imageId) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      const deleteImageSql =
        "DELETE FROM hike_pictures WHERE hike_pictures_id = ?";
      const [result] = await connection.execute(deleteImageSql, [imageId]);

      if (result.affectedRows === 0) {
        throw new Error("No image found for the specified id");
      }

      await connection.commit();
      connection.release();
      return { message: "Image deleted successfully", imageId };
    } catch (error) {
      await connection.rollback();
      connection.release();
      console.error("Error deleting image:", error);
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
  getAllDelHikes = async () => {
    try {
      const sql = "SELECT * FROM hike WHERE hike_is_deleted = 1";
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };
  getExperiencesByHikeId = async (hikeId) => {
    const query = `
      SELECT e.experience_id, e.experience_title, e.experience_description, 
             e.experience_price_child, e.experience_price_adult
      FROM hike_experience he
      INNER JOIN experience e ON he.experience_id = e.experience_id
      WHERE he.hike_id = ? AND e.experience_is_deleted = 0
    `;
    try {
      return await executeQuery(query, [hikeId]);
    } catch (error) {
      console.error(`Error fetching experiences for hike ID ${hikeId}:`, error);
      throw new Error("Failed to fetch experiences");
    }
  };
  getUnassignedExperiencesByHikeId = async (hikeId) => {
    const query = `
      SELECT e.experience_id, e.experience_title, e.experience_description, 
             e.experience_price_child, e.experience_price_adult
      FROM experience e
      WHERE e.experience_is_deleted = 0
      AND NOT EXISTS (
        SELECT 1 FROM hike_experience he 
        WHERE he.experience_id = e.experience_id AND he.hike_id = ?
      )
    `;
    try {
      return await executeQuery(query, [hikeId]);
    } catch (error) {
      console.error(`Error fetching unassigned experiences for hike ID ${hikeId}:`, error);
      throw new Error("Failed to fetch unassigned experiences");
    }
  };

  async removeExperiencesFromHike(hikeId, experienceIds) {
    try {
      if (!Array.isArray(experienceIds) || experienceIds.length === 0) {
        throw new Error("Invalid experience IDs");
      }

      // Generar los placeholders de la consulta
      const placeholders = experienceIds.map(() => '?').join(', ');

      // Consulta para eliminar experiencias del hike
      const query = `DELETE FROM hike_experience WHERE hike_id = ? AND experience_id IN (${placeholders})`;

      // Ejecutar la consulta con executeQuery
      const result = await executeQuery(query, [hikeId, ...experienceIds]);

      // Retornar el resultado, si se eliminaron filas
      if (result.affectedRows > 0) {
        return { affectedRows: result.affectedRows };
      } else {
        return { message: "No experiences found to remove" };
      }
    } catch (error) {
      console.error("Error while removing experiences:", error);
      throw new Error("Failed to remove experiences");
    }
  }

  // Asignar nuevas experiencias a un hike
  assignExperienceToHike = async (hikeId, experienceId) => {
    const query = `INSERT INTO hike_experience (hike_id, experience_id) VALUES (?, ?)`;
    try {
      await executeQuery(query, [hikeId, experienceId]);
      console.log(`Experience ID ${experienceId} assigned to Hike ID ${hikeId}`);
      return { message: "Experience assigned successfully" };
    } catch (error) {
      console.error(`Error assigning experience ID ${experienceId} to hike ID ${hikeId}:`, error.message);
      throw new Error("Failed to assign experience");
    }
  };
  
  // Eliminar una experiencia específica de un hike
  removeExperienceByHikeId = async (hikeId, experienceId) => {
    const query = `DELETE FROM hike_experience WHERE hike_id = ? AND experience_id = ?`;
    try {
      console.log(
        `Removing experience ID ${experienceId} from hike ID ${hikeId}`
      );
      const result = await executeQuery(query, [hikeId, experienceId]);
      if (result.affectedRows === 0) {
        console.warn(
          `No experience with ID ${experienceId} found for hike ID ${hikeId}`
        );
        return { message: "No such experience found for the hike" };
      }
      return { message: "Experience removed successfully" };
    } catch (error) {
      console.error(
        `Error removing experience ID ${experienceId} for hike ID ${hikeId}:`,
        error.message
      );
      throw new Error("Failed to remove experience");
    }
  };
  assignExperiencesToHike = async (hikeId, experienceIds) => {
    try {
      // Mapeamos las experiencias para crear un array de promesas de consultas
      const queries = experienceIds.map((experienceId) => {
        const query = `INSERT INTO hike_experience (hike_id, experience_id) VALUES (?, ?)`;
        return executeQuery(query, [hikeId, experienceId]);
      });
  
      // Ejecutar todas las consultas de inserción en paralelo
      await Promise.all(queries);
  
      return { message: "Experiences assigned successfully" };
    } catch (error) {
      console.error("Error assigning experiences to hike in DAL:", error);
      throw new Error("Failed to assign experiences");
    }
  };
  
  
}

export default new HikeDal();
