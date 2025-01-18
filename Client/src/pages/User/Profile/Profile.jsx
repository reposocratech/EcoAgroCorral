import { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AgroContext } from '../../../context/ContextProvider'
import perfil from '../../../../public/assets/images/user/perfilDef.jpg'
import './perfil.css'
import { Link, useNavigate } from 'react-router-dom'
import { fetchData } from '../../../helpers/axiosHelper'
import { ReservationCard } from '../../../components/ReservationCard/ReservationCard'
import logo from '../../../../public/assets/images/navbar/logoAgro.png'

export const Profile = () => {
  const [reservations, setReservations] = useState()
  const {user} = useContext(AgroContext);
  const navigate = useNavigate()
  
  useEffect(()=>{
    const fetchReservation = async ()=>{
      try {
        const resultRes = await fetchData(`api/user/getReservations/${user.user_id}`, "get");
        if(resultRes.length != 0){
          setReservations(resultRes);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchReservation();
  },[user]);

  console.log(reservations);
    
  return (
    <>
    <section className='profile'>
      <Container xxl="true">
        <Row className='info-profile mx-1'>
          <Col md={12} className='text-center p-4'>
          <img className='logo' src={logo} alt="" />
          <h2 className='p-3'>{user?.user_name} {user?.user_lastname}</h2>
          <div className='divisor'></div>
          </Col>
          <Col className='d-flex justify-content-center pb-4' lg={6}>
            <img src={user?.user_avatar?`http://localhost:4000/images/users/${user.user_avatar}`: perfil} alt="" />
          </Col>
          <Col lg={6} className='d-flex flex-column justify-content-center align-items-center mb-3'>
            <p>Correo electrónico: {user?.user_email}</p>
            <p>Domicilio: {user?.user_address}</p>
            <p>Número de teléfono: {user?.user_phone}</p>
            <Button className='btn' onClick={()=>navigate('/user/perfil/editUser')}>
              Editar
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
    <section className='py-4'>
      <Container xxl="true">
        <Row className='d-flex flex-column'>
          <Col className='text-center py-3'>
          <h3>Mis reservas</h3>
          </Col>
          {reservations?
          <Col className='d-flex flex-wrap justify-content-center gap-3'>
          {reservations?.map((elem)=>{
            return(
              <ReservationCard key={elem.reservation_id} reservation={elem} />
            )
          })}
          </Col>:
          <Col>
            <p>No has hecho ninguna reserva. Reserva ahora <Link to={'/user/reserva'}> aquí </Link> </p>
          </Col>}
        </Row>
      </Container>
    </section>
    </>
  )
}
