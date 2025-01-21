import {Button, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./experiencePresentationCard.css";
import { useEffect, useRef } from "react";

export const ExperiencePresentationCard = ({experience, index}) => {
  const backgroundRef1 = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    backgroundRef1.current.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(" + `${import.meta.env.VITE_SERVER_URL}images/experiences/${experience.experience_pictures_file}` + ")";
    console.log(experience);
    console.log(backgroundRef1.current.style.backgroundImage);
  }, [experience]);
  

  return (
    <div ref={backgroundRef1} className={(index+1)%2 === 0?`px-5 d-flex align-items-center justify-content-end presentation-card`:`px-5 d-flex align-items-center presentation-card`}>
      <Col lg={4} md={8} xs={12}>
        <div className="py-5 d-flex flex-column align-items-center justify-content-center">
          <h2>{experience.experience_title}</h2>
          <p className="text-center">{experience.experience_description}</p>
          <Button onClick={() => navigate(`/experiencias/${experience.experience_id}`)}> Saber mas</Button>
        </div>
      </Col>
    </div>
  )
}
