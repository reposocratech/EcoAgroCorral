import { useEffect, useRef } from 'react'
import { Col } from 'react-bootstrap';

export const ReservationCard = ({reservation}) => {
  const background = useRef();

  useEffect(() => {
    background.current.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url(" + `http://localhost:4000/images/hikes/${reservation.reservation_file}` + ")";
    
  }, []);

  return (
    <>
      <Col xl={3} lg={5} md={8} xs={12} ref={background} className='reserv'>
      <div className='text text-center py-2 fw-bold'>
        <h4 className='fs-4'>{reservation.reservation_experience_title}</h4>
        <p className='fs-5'>{reservation.reservation_hike_title}</p>
        <p>{reservation.reservation_date}</p>
        <p>{reservation.reservation_time.slice(0,5)} hs.</p>
        <p>{parseInt(reservation.reservation_adult) + parseInt(reservation.reservation_children)} personas</p>
      </div>
      </Col>
    </>
  )
}
