
import "./editFeatureList.css";
import trash from "../../../public/assets/icons/trash.svg";
import { fetchData } from "../../helpers/axiosHelper";

export const EditFeatureList = ({features, setFeatures}) => {

  const deleteFeatures = async (id, icon=null) => {
    if(icon){
      await fetchData(`api/experience/deleteFeature/${id}`, "delete", {icon});
    }
    else{
      await fetchData(`api/experience/deleteFeature/${id}`, "delete");
    }

    setFeatures(features.filter((e)=>{
      return e.feature_id !== id;
    }));
  }

  return (
    <div className="d-flex flex-wrap gap-2 feature-list-container">
      {features.map((elem, index)=>{
        return(
          <div key={index} className="feature-list-elem">
            <p className="element-name">{elem.feature_name}</p>
            <img className="trash-icon" src={trash} onClick={()=>deleteFeatures(elem.feature_id, elem.feature_icon)} alt="trash Icon" />
          </div>
        )
      })

      }
    </div>
  )
}
