import { executeQuery, dbPool } from "../../config/db.js";
import deleteFile from "../../utils/deleteFile.js";

class PostDal {
  // Crear un nuevo post con imágenes
  createPostWithImages = async (data) => {
    const {
      post_category_id,
      post_experience_id,
      post_description,
      post_title,
      files,
    } = data;

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
      return {
        message: "Category created successfully",
        categoryId: result.insertId,
      };
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

  getAllPost = async () => {
    try {
      let sql = `
      SELECT post.*, category.*, post_picture.post_picture_file AS post_file 
      FROM 
      post
      LEFT JOIN 
      category ON post.post_category_id = category.category_id
      LEFT JOIN 
      post_picture ON post.post_id = post_picture.post_picture_post_id 
      AND post_picture.is_main = 1
      ORDER BY post.post_date desc`;
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getDataPost = async (post_id) => {
    try {
      let sql = `SELECT 
      post.*, 
      category.*, 
      main_picture.post_picture_file AS main_post_file,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', post_picture_id, 'file', post_picture_file)) 
       FROM post_picture 
       WHERE post_picture_post_id = post.post_id AND is_main = 0) AS all_pictures,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', category_id, 'name', category_name)) 
       FROM category) AS all_categories
      FROM 
      post 
      LEFT JOIN 
      category ON post.post_category_id = category.category_id
      LEFT JOIN 
      post_picture AS main_picture ON post.post_id = main_picture.post_picture_post_id 
      AND main_picture.is_main = 1
      WHERE 
      post.post_id = ?`;
      const result = await executeQuery(sql, [post_id]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  editFileMain = async (img, post_id) => {
    try {
      let sqlImg = 'SELECT post_picture_file FROM post_picture WHERE post_picture_post_id = ? AND is_main = 1'
      const resImg = await executeQuery(sqlImg, [post_id]);
      if(resImg[0].post_picture_file){
        deleteFile(resImg[0].post_picture_file, "posts");
      }
      let sql =
        "UPDATE post_picture SET post_picture_file = ? WHERE post_picture_post_id = ? AND is_main = 1";
      await executeQuery(sql, [img, post_id]);
      return true;
    } catch (error) {
      throw error;
    }
  };

  editInfoPost = async (data) => {
    const { post_id, post_category_id, post_description, post_title } = data;

    try {
      let sql = `UPDATE post SET 
      post_category_id = ?, 
      post_description = ?,
      post_title = ? 
      WHERE post_id = ?`;
      await executeQuery(sql, [
        post_category_id,
        post_description,
        post_title,
        post_id,
      ]);
      return true;
    } catch (error) {
      throw error;
    }
  };

  deleteImg = async (id) => {
    try {

      let sqlImg = 'SELECT post_picture_file from post_picture WHERE post_picture_id = ?'
      const resImg = await executeQuery(sqlImg, [id]);
      if(resImg[0].post_picture_file){
        deleteFile(resImg[0].post_picture_file, "posts");
      }
      let sql = "DELETE FROM post_picture WHERE post_picture_id = ? ";
      await executeQuery(sql, [id]);
    } catch (error) {
      throw error;
    }
  };

  addFiles = async (post_id, files) => {
    try {
      for (const file of files) {
        if (!file.filename) {
          throw new Error("El archivo no tiene un nombre válido.");
        }
        const fileName = file.filename;
        console.log(fileName);

        const sql = `INSERT INTO post_picture (post_picture_post_id, post_picture_file) 
                        VALUES (?, ?)`;
        await executeQuery(sql, [post_id, fileName]);
      }
    } catch (error) {
      throw error;
    }
  };

  deletePost = async (post_id) => {
    try {
      let sqlImg = `select GROUP_CONCAT(post_picture_file SEPARATOR ',') AS images
      FROM post_picture 
      WHERE post_picture_post_id = ?`;
      const resImg = await executeQuery(sqlImg, [post_id]);
      let postImages = [];
      if (resImg[0].images) {
        postImages = resImg[0].images.split(",");
        for (const elem of postImages) {
          deleteFile(elem, "posts");
        }
      }
      let sql = "DELETE FROM post WHERE post_id = ?";
      const result = await executeQuery(sql, [post_id]);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default new PostDal();
