import { executeQuery } from "../../config/db.js";


class PostDal {
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

  getDataPost = async (post_id) =>{
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
      post.post_id = ?`
      const result = await executeQuery(sql, [post_id]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  editFileMain = async (img, post_id) =>{
    try {
      let sql = 'UPDATE post_picture SET post_picture_file = ? WHERE post_picture_post_id = ? AND is_main = 1'
      await executeQuery(sql, [img, post_id]);
      return true;
    } catch (error) {
      throw error;
    } 
  }

  editInfoPost = async (data) =>{
    const {post_id, post_category_id, post_description, post_title} = data;
    
    try {
      let sql = `UPDATE post SET 
      post_category_id = ?, 
      post_description = ?,
      post_title = ? 
      WHERE post_id = ?`
      await executeQuery(sql, [post_category_id, post_description, post_title, post_id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  deleteImg = async (id) =>{
    try {
      let sql = 'DELETE FROM post_picture WHERE post_picture_id = ? '
      await executeQuery(sql, [id]);
    } catch (error) {
      throw error;
    }
  }

  addFiles = async (post_id, files)=>{
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
  }

  
}

export default new PostDal();
