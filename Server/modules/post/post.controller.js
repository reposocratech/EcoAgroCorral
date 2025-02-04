import { log } from "console";
import postDal from "./post.dal.js";
import userDal from "../user/user.dal.js";

class PostController {
  
  // Get all posts
  getAllPosts = async (req, res) => {
    try {
      const posts = await postDal.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  };


  // Get a post by ID
  getPostById = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await postDal.getPostById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  };

  // Create a new post
  createPost = async (req, res) => {
    const { post_category_id, post_experience_id, post_description, post_title } = req.body;
    const files = req.files; // Multer guardará los archivos en req.files
    console.log(req.body); // Verifica si los datos del formulario están llegando correctamente
    
    console.log(files); // Verifica si los archivos están llegando correctamente
  
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "At least one image must be uploaded." });
    }
  
    try {
      // Llamar a la función para crear el post y manejar las imágenes
      const result = await postDal.createPostWithImages({
        post_category_id,
        post_experience_id,
        post_description,
        post_title,
        files, // Enviar los archivos al DAL
      });
  
      res.status(201).json({
        message: result.message,
        postId: result.postId,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post", error: error.message });
    }
  };
  

  



  // Add images to a post
  addPostImages = async (req, res) => {
    const { postId } = req.params;
    const files = req.files;
    try {
      const images = await postDal.addPostImages(postId, files);
      res.json(images);
    } catch (error) {
      console.error("Error adding images to post:", error);
      res.status(500).json({ error: "Failed to add images to post" });
    }
  };

  

  // Get all categories
  getAllCategories = async (req, res) => {
    try {
      const categories = await postDal.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  };

  // Create a new category
  createCategory = async (req, res) => {
    const { category_name } = req.body;
    try {
      const newCategory = await postDal.createCategory(category_name);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  };
  
  deleteCategory = async (req, res) => {
    const { categoryId } = req.params; // Obtiene el ID de la categoría desde los parámetros de la URL
    try {
      const result = await postDal.deleteCategoryById(categoryId); // Llama al método en la capa de acceso a datos
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Category not found" }); // Responde con un error si no se encontró la categoría
      }
      res.json({ message: "Category deleted successfully" }); // Responde con un mensaje de éxito si se eliminó correctamente
    } catch (error) {
      console.error(`Error deleting category with ID ${categoryId}:`, error); // Muestra el error en la consola
      res.status(500).json({ error: "Failed to delete category" }); // Responde con un error genérico
    }
  };

  getAllPost = async (req,res)=>{
    try {
      const result = await postDal.getAllPost();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los post" });
    }
  }

  getDataPost = async (req, res)=>{
    const {post_id} = req.params;
    try {
      const result = await postDal.getDataPost(post_id);
      res.status(200).json(result);
      
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la información del post" });
    }
  }

  editPost = async (req,res) =>{
    
    const data = JSON.parse(req.body.post);

    try {
      console.log("****", req.file);
      if(req.file){
        await postDal.editFileMain(req.file.filename, data.post_id);
      }
      const result = await postDal.editInfoPost(data);
      res.status(200).json({ message: "Post editado" });
    } catch (error) {
      res.status(500).json({ message: "Error al editar el post" });
      
    }
  }

  deleteImg = async (req,res)=>{
    const {id} = req.params;
    try {
      const result = await postDal.deleteImg(id);
      res.status(200).json({ message: "Imagen eliminada" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la imagen" });
    }
    
  }

  addFiles = async (req, res) =>{
    const {post_id} = req.params;
    const files = req.files;
    console.log(files);
    
    try {
      if (!files || files.length === 0) {
        res.status(400).json({ message: "Debes añadir al menos una imagen" });
      }
      await postDal.addFiles(post_id, files);
      res.status(200).json({ message: "Imágenes añadidas" });
    } catch (error) {
      res.status(500).json({ message: "Error al añadir imágenes" });
    }
  }

  deletePost = async (req, res)=>{
    const {post_id} = req.params;
    try {
      const result = await postDal.deletePost(post_id);
      res.status(200).json({ message: "Post eliminado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el post" });
    }
  }


}

export default new PostController();
