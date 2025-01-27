import fs from 'fs';
import path  from 'path';

const deleteFile = (file, folder) =>{
  const filePath = path.join('./public/images', folder, file)
  try{
    fs.unlinkSync(filePath);
    console.log("borradooo ok");
    
  }catch (error){
    console.log(error);
    throw error;
  }
}

export default deleteFile;