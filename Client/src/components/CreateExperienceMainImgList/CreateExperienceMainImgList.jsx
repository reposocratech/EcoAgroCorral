import trash from "../../../public/assets/icons/trash.svg";

export const CreateExperienceMainImgList = ({mainFile, setMainFile}) => {

  const deleteMainFile = async () => {
    setMainFile(); 
  }

  return (
    <div className="d-flex flex-wrap gap-2 py-3 feature-list-container">
          <div className="feature-list-elem">
            <p className="element-name">{mainFile.name}</p>
            <img src={trash} onClick={()=>deleteMainFile()} alt="trash Icon" />
          </div>
    </div>
  )
}