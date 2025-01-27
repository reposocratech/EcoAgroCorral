import trash from "../../../public/assets/icons/trash.svg";

export const EditExperienceMainImgList = ({mainFile, deletePicture}) => {

  /* const deleteMainFile = async () => {
    setMainFile(); 
  } */

  return (
    <div className="d-flex flex-wrap gap-2 feature-list-container">
          <div className="feature-list-elem">
            <p className="element-name">{mainFile.experience_pictures_file}</p>
            <img src={trash} onClick={()=>deletePicture(mainFile.experience_pictures_id, 1, mainFile.experience_pictures_file)} alt="trash Icon" />
          </div>
    </div>
  )
}