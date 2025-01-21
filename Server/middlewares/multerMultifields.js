import multer from 'multer';

function uploadImage() {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb)=>{
        let folder;
        if(file.fieldname === "singleFile" || file.fieldname === "multipleFiles"){
          folder = `./public/images/experiences`
        }
        else{
          folder = `./public/images/features`
        }
        cb(null, folder);
      },
      filename: function (req, file, callback) {
        callback(null, "Id-" + Date.now() + "-" + file.originalname);
      },
    });
    const upload = multer({ storage: storage }).fields([
      {name: "singleFile"},
      {name: "multipleFiles"},
      {name: "feature_icon"}
    ]);
  
    return upload;
  } catch (error) {
    console.log(error);
  }
  
}

export default uploadImage;