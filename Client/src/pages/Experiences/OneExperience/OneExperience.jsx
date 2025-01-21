import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';
import { Col, Container, Row } from 'react-bootstrap';
import { HikeCard } from '../../../components/HikeCard/HikeCard';

import "./oneExperience.css";
import { FeatureCardJustifyLeft } from '../../../components/FeatureCardJustifyLeft/FeatureCardJustifyLeft.jsx';
import { FeatureCardJustifyRight } from '../../../components/FeatureCardJustifyRight/FeatureCardJustifyRight.jsx';
import { ExperiencePicGallery } from '../../../components/ExperiencePicGallery/ExperiencePicGallery.jsx';
import { AgroContext } from '../../../context/ContextProvider.jsx';

export const OneExperience = () => {
  const {user} = useContext(AgroContext);
  const [experienceInfo, setExperienceInfo] = useState({});
  const {id} = useParams();
  console.log(user);
  console.log(experienceInfo);

   useEffect(() => {
     const getExperience = async () => {
      try {
        const res = await fetchData(`api/experience/getOneExperience/${id}`, "get");
        setExperienceInfo(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
     }
   
     getExperience();
   }, [])
   
  return (
    <>
      <section className='pt-5'>
        <Container fluid="xxl" >
          <div className="text-center px-5 text-experience">
            <h1>{experienceInfo?.experience?.title}</h1>
            <p>{experienceInfo?.experience?.description}</p>
          </div>
        </Container>
      </section>
      <section className='my-5 py-5 gray-bg'>
        <Container fluid="xxl">
          <h2 className='text-experience'>Paseos disponibles:</h2>

          <Row>
            <div className="d-flex justify-content-around flex-wrap">
              {experienceInfo?.hikes?.map((elem) => {
                return(
                  <Col key={elem.hike_id} xs={12} md={6} xl={4} className='card-cols'>
                    <HikeCard hike={elem}/>
                  </Col>
                );
              })}
            </div>
          </Row>
        </Container>
      </section>
      <section className='my-5 text-experience'>
        <Container fluid="xxl">
              {experienceInfo?.features?.map((elem, index) => {
                return((index+1) %2 === 1? 
                <Row key={elem.feature_id} className='d-flex justify-content-start'>
                  <Col key={elem.feature_id} xs={12} xl={6} className=''>
                    <FeatureCardJustifyLeft feature={elem} />
                  </Col>
                </Row>
                : 
                <Row key={elem.feature_id} className='d-flex justify-content-end'>
                  <Col key={elem.feature_id} xs={12} xl={6} className=''>
                    <FeatureCardJustifyRight feature={elem} />
                  </Col>
                </Row>
                );
              })}
        </Container>
      </section>
      <section className='mt-5 gray-bg'>
        <Container fluid="xxl">
          <Row>
            <div className="d-flex justify-content-around flex-wrap">
              <ExperiencePicGallery pictures={experienceInfo?.experiencePictures} />
            </div>
          </Row>
        </Container>
      </section>
    </>
  )
}
