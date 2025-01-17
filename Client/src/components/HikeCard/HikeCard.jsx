
import { useEffect, useRef } from "react";
import "./hikeCard.css";
import { Button } from "react-bootstrap";

export const HikeCard = ({hike}) => {
  const cardRef = useRef();
  console.log(hike);
  const {title, picture_file} = hike;

  useEffect(() => {
    cardRef.current.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(" + `/assets/images/hikes/${picture_file}` + ")";
  
  }, [])
  

  return (
    <div ref={cardRef} className="hike-card text-center">
      <h3>{title}</h3>
      <Button>Saber mas</Button>
    </div>
  )
}
