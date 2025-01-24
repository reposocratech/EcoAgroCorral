import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col } from 'react-bootstrap';

export const ReservationCard = ({reservation}) => {
  const background = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    background.current.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url(" + `http://localhost:4000/images/hikes/${reservation.reservation_file}` + ")";
    
  }, []);

  return (
    <>
      <Col lg={3} md={6} xs={12} className='p-2'>
      <div ref={background}  className={`reserv text-center d-flex flex-column align-items-center justify-content-between py-3 fw-bold ${reservation.reservation_date < new Date(Date.now()).toISOString().split("T")[0] && "pas-reserv"}`}>
        <h4 className='fs-4'>{reservation.reservation_experience_title}</h4>
        <p className='fs-5'>{reservation.reservation_hike_title}</p>
        <p>{reservation.reservation_date.slice(8,11)}/{reservation.reservation_date.slice(5,7)}/{reservation.reservation_date.slice(0,4)}</p>
        <p>{reservation.reservation_time.slice(0,5)} hs.</p>
        <p>{parseInt(reservation.reservation_adult) + parseInt(reservation.reservation_children)} personas</p>
        {reservation.reservation_date > new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0] &&
        <button className='btn' onClick={()=> navigate(`/reserva/cancelarReserva/${reservation.reservation_id}`)}>Modificar/Cancelar</button>}
      </div>
      </Col>
    </>
  )
}
