import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { fetchData } from '../../../helpers/axiosHelper'
import { Link, useParams } from 'react-router-dom'
import './cancelReservation.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { AgroContext } from '../../../context/ContextProvider'

export const CancelReservation = () => {
  const {reservation_id} = useParams()
  const [reservation, setReservation] = useState();
  const [newDate, setNewDate] = useState()
  const [dates, setDates] = useState([]);
  const [delReservation, setDelReservation] = useState(false);
  const [modReservation, setModReservation] = useState(false);
  const [msg, setMsg] = useState("");
  const [days, setDays] = useState([]);
  const {user} = useContext(AgroContext);


  useEffect(()=>{
    registerLocale("es", es);
    const fetchReservation = async ()=>{
      try {
        const result = await fetchData(`api/reservation/getOneReservation/${reservation_id}`, 'get');
        setReservation(result)

        const reservationsDate = await fetchData(
          "api/reservation/getDates",
          "get"
        );
        if (dates.length == 0) {
          for (let elem of reservationsDate) {
            dates.push(elem.reservation_date);
          }
          const convertDate = dates.map((date) => new Date(date));
          setDates(convertDate)
        }

        const reservationsDays = await fetchData(
          "api/reservation/getDays",
          "get"
        );

        if(days.length == 0){
          for(let elem of reservationsDays){
            days.push(parseInt(elem.reservation_day_value));
          }
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchReservation();
  },[dates])
 
  
  const onSubmitDelete = async ()=>{
    try {
      await fetchData("api/admin/cancelReservation", "delete", {
        id: reservation_id
      });
      setDelReservation(true);
    } catch (error) {
      console.log(error);
    }
  }

  const modifyReservation = async ()=>{
    try {
      if(!newDate){
        setMsg("Debes elegir una nueva fecha")
      }
      const result = await fetchData('api/reservation/modifyReservation', 'put', {newDate, user, reservation});
      setModReservation(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {!delReservation && !modReservation &&
      <section>
        <Container fluid="xxl">
          <Row className='justify-content-center py-5'>
            <Col lg={6} md={10} xs={12} className='d-flex flex-column align-items-center'>
            <article className='d-flex flex-column align-items-center cancel-reservation p-3 px-5 my-3 text-center'>
              <p className='fw-bold fs-5'>¿Quieres modificar la fecha de tu reserva ("{reservation?.hike_title}") prevista para el {reservation?.reservation_date.slice(8,11)}/{reservation?.reservation_date.slice(5,7)} ?</p>
              

                    <DatePicker
                      className="input-date mb-3 p-2"
                      name="reservation_date"
                      value={newDate}
                      onChange={(date) =>
                        setNewDate(new Date(
                          date.getTime() - date.getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .split("T")[0])
                      }
                      minDate={
                        new Date(Date.now() + 86400000)
                          .toISOString()
                          .split("T")[0]
                      }
                      excludeDates={dates}
                      filterDate={(date) => days?.includes(date.getDay())}
                      selected={newDate}
                      placeholderText="Selecciona una nueva fecha"
                      locale="es"
                      
                    />
                    {!newDate && msg != "" &&
                    <span className='pb-2'>{msg}</span>}
                    <Button onClick={modifyReservation} className='btn-mod'>Modificar fecha</Button>
              
            </article>
            <article className='d-flex flex-column align-items-center cancel-reservation text-center p-3 px-5'>
              <p className='fw-bold fs-5'>¿O prefieres cancelar la reserva?</p>
              <Button className='btn' onClick={onSubmitDelete}>Cancelar definitivamente</Button>
              <p className='pt-3'>(Al cancelar se eliminara tu reserva definitivamente)</p>
            </article>
            </Col>
          </Row>
        </Container>
      </section>}
      {delReservation &&
      <section> 
        <Container fluid="xxl">
        <Row className='justify-content-center py-5'>
            <Col lg={6} md={10} xs={12} className='d-flex flex-column align-items-center'>
            <article className='d-flex flex-column align-items-center cancel-reservation text-center p-3 px-5'>
              <p className='fw-bold fs-5'>
              Tu cancelación ha sido procesada con éxito.
              </p>
              <p>Si en el futuro deseas volver a reservar o necesitas asistencia, estaremos encantados de ayudarte. No dudes en contactarnos para cualquier consulta.</p>
              <Link className='link' to={'/user/perfil'}>Volver a tu perfil</Link>
            </article>
            </Col>
          </Row>
        </Container>
      </section>}
      {modReservation &&
      <section> 
        <Container fluid="xxl">
        <Row className='justify-content-center py-5'>
            <Col lg={6} md={10} xs={12} className='d-flex flex-column align-items-center'>
            <article className='d-flex flex-column align-items-center cancel-reservation text-center p-3 px-5'>
              <p className='fw-bold fs-5'>
              Hemos realizado la modificación en la fecha de tu reserva.
              </p>
              <p>Tu nueva fecha para 
                "{reservation?.hike_title}" es el <span className='fw-bold'>{newDate?.slice(8,11)}/{newDate?.slice(5,7)}.</span></p>
              <p>Si necesitas más cambios o tienes alguna consulta, no dudes en contactarnos. Estamos aquí para ayudarte.
              </p>
              <p className='fw-bold'>Gracias por elegirnos!</p>
              <Link className='link' to={'/user/perfil'}>Volver a tu perfil</Link>
            </article>
            </Col>
          </Row>
        </Container>
      </section>}
    </>
  )
}
