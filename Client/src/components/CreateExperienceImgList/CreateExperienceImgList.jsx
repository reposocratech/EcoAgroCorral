import trash from "../../../public/assets/icons/trash.svg";

export const CreateExperienceImgList = ({files, setFiles}) => {
  
  console.log("filessss",files);

  const deleteFile = (index) => {
    setFiles([...files].filter((e, i)=>{
      return i !== index;
    }))
  }

  return (
    <div className="d-flex flex-wrap gap-2 py-3 feature-list-container">
      {[...files].map((elem, index)=>{
        return(
          <div key={index} className="feature-list-elem">
            {/* <p><img src={elem.icon} alt="" /></p> */}
            <p className="element-name">{elem.experience_pictures_file}</p>
            <img src={trash} onClick={()=>deleteFile(index)} alt="trash Icon" />
            {/* <button type="button" onClick={()=>deleteFeatures(index)}>borrar</button> */}
          </div>
        )
      })}
    </div>
  )
}