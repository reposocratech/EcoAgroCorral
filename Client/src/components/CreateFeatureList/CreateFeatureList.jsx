
import "./createFeatureList.css";
import trash from "../../../public/assets/icons/trash.svg";

export const CreateFeatureList = ({features, setFeatures}) => {

  const deleteFeatures = (index) => {
    setFeatures(features.filter((e, i)=>{
      return i !== index;
    }))
  }

  return (
    <div className="d-flex flex-wrap gap-2 py-3 feature-list-container">
      {features.map((elem, index)=>{
        return(
          <div key={index} className="feature-list-elem">
            {/* <p><img src={elem.icon} alt="" /></p> */}
            <p>{elem.feature_name}</p>
            <img src={trash} onClick={()=>deleteFeatures(index)} alt="trash Icon" />
            {/* <button type="button" onClick={()=>deleteFeatures(index)}>borrar</button> */}
          </div>
        )
      })

      }
    </div>
  )
}
