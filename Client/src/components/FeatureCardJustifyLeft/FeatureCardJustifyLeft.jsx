import "./featureCardJustifyLeft.css";

export const FeatureCardJustifyLeft = ({feature}) => {
  const {name, description, icon} = feature;

  return (
    <div className='d-flex align-items-center gap-2'>
      <div>
        <img className='feature-icon' src={`${import.meta.env.VITE_SERVER_URL}images/features/${icon}`} alt=" Icon of the characteristic" />
      </div>
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>

    </div>
  )
}
