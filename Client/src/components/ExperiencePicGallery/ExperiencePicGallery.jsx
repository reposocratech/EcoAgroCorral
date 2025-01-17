import React from 'react'
import { Col } from 'react-bootstrap';

import "./experiencePicGallery.css"

export const ExperiencePicGallery = ({pictures}) => {
  return (
    <>
      <div className="pic-gallery">
        <Col xs={12} md={6} xl={4} className='pic-cols'>
          <img src="/assets/images/about/fondo1.png" alt="" />
        </Col>
        <Col xs={12} md={6} xl={4} className='pic-cols'>
          <img src="/assets/images/about/fondo1.png" alt="" />
        </Col>
        <Col xs={12} md={6} xl={4} className='pic-cols'>
          <img src="/assets/images/about/fondo1.png" alt="" />
        </Col>
        <Col xs={12} md={6} xl={4} className='pic-cols'>
          <img src="/assets/images/about/fondo1.png" alt="" />
        </Col>
      </div>
    </>
  )
}


/* {pictures?.map((elem) => {
  return(
    <Col key={elem.hike_id} xs={12} md={6} xl={4} className='card-cols'>
      <img src="/assets/images/about/fondo1.png" alt="" />
    </Col>
  );
})} */