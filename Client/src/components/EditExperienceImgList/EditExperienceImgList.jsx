import trash from "../../../public/assets/icons/trash.svg";
import "./editExperienceImgList.css";

export const EditExperienceImgList = ({files, deletePicture}) => {
  

  /* const deleteFile = (index) => {
    setFiles([...files].filter((e, i)=>{
      return i !== index;
    }))
  } */

  return (
    <div className="d-flex flex-wrap gap-2 feature-list-container">
      {[...files].map((elem, index)=>{
        return(
          <div key={index} className="feature-list-elem">
            {/* <p><img src={elem.icon} alt="" /></p> */}
            <p className="element-name">{elem.experience_pictures_file}</p>
            <img className="trash-icon" src={trash} onClick={()=>deletePicture(elem.experience_pictures_id, 0, elem.experience_pictures_file)} alt="trash Icon" />
            {/* <button type="button" onClick={()=>deleteFeatures(index)}>borrar</button> */}
          </div>
        )
      })}
    </div>
  )
}