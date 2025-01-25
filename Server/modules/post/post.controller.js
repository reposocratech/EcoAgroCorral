import { log } from "console";
import postDal from "./post.dal.js";
import userDal from "../user/user.dal.js";

class PostController {

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

}

export default new PostController();