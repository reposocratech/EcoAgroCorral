import { Col } from 'react-bootstrap';

import "./experiencePicGallery.css"

export const ExperiencePicGallery = ({pictures}) => {
  return (
    <>
      {pictures?.map((elem) => {
        return(
          <Col key={elem.experience_pictures_id} xs={12} md={6} xl={4} className='pic-cols'>
            <img src={`${import.meta.env.VITE_SERVER_URL}images/experiences/${elem.experience_pictures_file}`} alt="" />
          </Col>
        );
      })}
    </>
  )
}