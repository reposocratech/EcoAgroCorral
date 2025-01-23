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
}

export default new PostDal();
