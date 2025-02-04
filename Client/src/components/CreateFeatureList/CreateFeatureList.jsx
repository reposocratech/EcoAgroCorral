
import "./createFeatureList.css";
import trash from "../../../public/assets/icons/trash.svg";

export const CreateFeatureList = ({features, setFeatures}) => {

  const deleteFeatures = (index) => {
    setFeatures(features.filter((e, i)=>{
      return i !== index;
    }))
  }

  return (
    <div className="d-flex flex-wrap gap-2 feature-list-container">
      {features.map((elem, index)=>{
        return(
          <div key={index} className="feature-list-elem">
            <p className="element-name">{elem.feature_name}</p>
            <img className="trash-icon" src={trash} onClick={()=>deleteFeatures(index)} alt="trash Icon" />
          </div>
        )
      })

      }
    </div>
  )
}
