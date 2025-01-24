import postDal from "./post.dal.js";

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

}

export default new PostController();