
import { useEffect, useRef } from "react";
import "./hikeCard.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const HikeCard = ({hike}) => {
  const cardRef = useRef();
  const navigate = useNavigate();
  const {title, picture_file, hike_id } = hike;

  useEffect(() => {
    cardRef.current.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(" + `${import.meta.env.VITE_SERVER_URL}images/hikes/${picture_file}` + ")";
  }, [])
  

  return (
    <div ref={cardRef} className="hike-card text-center mx-2">
      <h3 className="title-hike">{title}</h3>
      <Button onClick={()=>navigate(`/paseo/unPaseo/${hike_id}`)}>Saber más</Button>
    </div>
  )
}
