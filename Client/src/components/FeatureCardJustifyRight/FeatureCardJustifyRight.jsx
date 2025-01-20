import "./featureCardJustifyRight.css";

export const FeatureCardJustifyRight = ({feature}) => {
  const {name, description, icon} = feature;

  return (
    <div className='d-flex align-items-center justify-content-end gap-2 text-end'>
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div>
        <img className='feature-icon' src={`/assets/icons/features/${icon}`} alt=" Icon of the characteristic" />
      </div>

    </div>
  )
}
