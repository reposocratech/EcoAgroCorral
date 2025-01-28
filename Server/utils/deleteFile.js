import fs from 'fs';
import path  from 'path';

const deleteFile = (file, folder) =>{
  const filePath = path.join('./public/images', folder, file)
  try{
    fs.unlinkSync(filePath);
    
    
  }catch (error){
    
    throw error;
  }
}

export default deleteFile;