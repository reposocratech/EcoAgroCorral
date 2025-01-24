
import "./FeatureIConList.css";
import trash from "../../../public/assets/icons/trash.svg";

export const FeatureIconList = ({feature, setFeature, modifOrCreate, newFile}) => {

  const deleteIcon = () => {
    setFeature({...feature, feature_icon: ""});
  }

  return (
    <div className="d-flex flex-wrap gap-2 py-3 feature-list-container">
      <div className="feature-list-elem">
        {/* <p><img src={elem.icon} alt="" /></p> */}
        <p className="element-name">{newFile === 0 ? feature?.feature_icon : feature?.feature_icon?.name}</p>
        <img src={trash} onClick={()=>deleteIcon()} alt="trash Icon" />
      </div>

    </div>
  )
}
