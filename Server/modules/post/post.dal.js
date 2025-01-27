import { executeQuery, dbPool } from "../../config/db.js";

class PostDal {
  // Crear un nuevo post con imágenes
  createPostWithImages = async (data) => {
    const { post_category_id, post_experience_id, post_description, post_title, files } = data;

    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      // Insertar el post
      const sqlPost = `INSERT INTO post (post_category_id, post_experience_id, post_description, post_title) 
                       VALUES (?, ?, ?, ?)`;
      const [result] = await connection.execute(sqlPost, [
        post_category_id,
        post_experience_id || null, // Permitir NULL si no se proporciona experience_id
        post_description,
        post_title,
      ]);

      const postId = result.insertId;

      // Validar que haya al menos una imagen
      if (!files || files.length === 0) {
        throw new Error("At least one image must be uploaded");
      }

      // Insertar imágenes
      const sqlImage = `INSERT INTO post_picture (post_picture_post_id, post_picture_file, is_main) 
                        VALUES (?, ?, ?)`;
      let isMainImageSet = false;

      for (const file of files) {
        await connection.execute(sqlImage, [
          postId,
          file.filename,
          isMainImageSet ? 0 : 1, // La primera imagen es la principal
        ]);
        isMainImageSet = true;
      }

      await connection.commit();
      connection.release();
      return { message: "Post created successfully", postId };
    } catch (error) {
      await connection.rollback();
      connection.release();
      console.error("Error during transaction:", error);
      throw error;
    }
  };

  // Obtener un post por ID, incluyendo imágenes
  getPostById = async (postId) => {
    try {
      // Obtener el post y la categoría asociada
      const sqlPost = `
        SELECT p.*, c.category_name 
        FROM post p
        JOIN category c ON p.post_category_id = c.category_id
        WHERE p.post_id = ?`;
      const postResult = await executeQuery(sqlPost, [postId]);
  
      if (postResult.length === 0) {
        return null; // No se encontró el post
      }
  
      // Obtener las imágenes asociadas al post
      const sqlImages = `
        SELECT post_picture_file, is_main 
        FROM post_picture 
        WHERE post_picture_post_id = ?`;
      const imagesResult = await executeQuery(sqlImages, [postId]);
  
      // Asignar las imágenes al post
      const post = postResult[0];
      post.images = imagesResult;
  
      return post; // Devolver el post con la categoría y las imágenes
  
    } catch (error) {
      console.error(`Error fetching post by ID ${postId}:`, error);
      throw new Error("Failed to fetch post");
    }
  };
  



  

  // Obtener todos los posts
  getAllPosts = async () => {
    try {
      const sql = "SELECT * FROM post";
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.error("Error fetching all posts:", error);
      throw new Error("Failed to fetch posts");
    }
  };

  // Añadir imágenes a un post existente
  addPostImages = async (postId, files) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      const sqlImage = `INSERT INTO post_picture (post_picture_post_id, post_picture_file, is_main) 
                        VALUES (?, ?, ?)`;

      for (const file of files) {
        await connection.execute(sqlImage, [
          postId,
          file.filename,
          file.is_main || 0,
        ]);
      }

      const sqlNewImages = `SELECT * FROM post_picture WHERE post_picture_post_id = ?`;
      const [result] = await connection.execute(sqlNewImages, [postId]);

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



  // Obtener todas las categorías
  getAllCategories = async () => {
    try {
      const sql = "SELECT * FROM category";
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  };
 

  // Crear una nueva categoría
  createCategory = async (categoryName) => {
    try {
      const sql = "INSERT INTO category (category_name) VALUES (?)";
      const result = await executeQuery(sql, [categoryName]);
      return { message: "Category created successfully", categoryId: result.insertId };
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Failed to create category");
    }
  };
 
   deleteCategoryById = async (categoryId) => {
    try {
      const query = "DELETE FROM category WHERE category_id = ?";
      const result = await executeQuery(query, [categoryId]);
      return result; // `affectedRows` indicará las filas afectadas
    } catch (error) {
      console.error(`Error deleting category with ID ${categoryId}:`, error);
      throw error;
    }
  };
}

export default new PostDal();
