import "./featureCardJustifyRight.css";

export const FeatureCardJustifyRight = ({feature}) => {
  const {feature_name, feature_description, feature_icon} = feature;

  return (
    <div className='d-flex align-items-center justify-content-end gap-2 text-end'>
      <div>
        <h4>{feature_name}</h4>
        <p>{feature_description}</p>
      </div>
      <div>
        <img className='feature-icon' src={`${import.meta.env.VITE_SERVER_URL}images/features/${feature_icon}`} alt=" Icon of the characteristic" />
      </div>

    </div>
  )
}
