import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { AgroContext } from "../../../context/ContextProvider.jsx";
import { Link, useNavigate } from 'react-router-dom'

const initialValue = {
  reservation_experience_id: null,
  reservation_hike_id: "",
  reservation_text: "",
  reservation_date: "",
  reservation_time: "",
  reservation_adult: "1",
  reservation_children: "0",
};

export const Reservation = () => {
  const [experiences, setExperiences] = useState([]);
  const [hikes, setHikes] = useState([]);
  const [data, setData] = useState([]);
  const [reservation, setReservation] = useState(initialValue);
  const [msg, setMsg] = useState("");
  const [msgReserv, setMsgReserv] = useState(false);
  const { user } = useContext(AgroContext);
  const navigate = useNavigate();

  const numAdult = Array.from({ length: 20 }, (value, i) => i + 1);
  const numChildren = Array.from(
    { length: 19 - reservation?.reservation_adult },
    (value, i) => i
  );

  const reservTime = Array.from(
    { length: 8 },
    (value, i) => `${parseInt(i / 2) + 8}:${i % 2 === 0 ? "00" : "30"}`
  );

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const result = await fetchData("api/user/getExperience", "get");
        setData(result);

        for (let elem of result) {
          experiences.push({
            title: elem.experience_title,
            id: elem.experience_id,
          });
        }
        let set = new Set(experiences.map(JSON.stringify));
        let experiencesSinDup = Array.from(set).map(JSON.parse);
        setExperiences(experiencesSinDup);
      } catch (error) {
        console.log(error);
      }
    };

    const hikesTemp = data.filter(
      (elem) => elem.experience_id == reservation.reservation_experience_id
    );
    setHikes(hikesTemp);

    fetchExperience();
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const onSubmit = async () => {
    try {
      if(!reservation.reservation_experience_id ||
        !reservation.reservation_hike_id ||
        !reservation.reservation_date ||
        !reservation.reservation_time
        ){
          setMsg("Debes cumplimentar todos los campos")
        } else if(reservation.reservation_adult + reservation.reservation_children < 2){
          setMsg("La reserva debe ser de un mínimo de dos personas.")
        }else{

          const data = [
            {
              ...reservation,
              reservation_total_price:
                hikes[0]?.experience_price_adult * reservation.reservation_adult +
                hikes[0]?.experience_price_child * reservation.reservation_children,
              reservation_user_id: user.user_id,
            },
            
          ];
          const result = await fetchData('api/user/createReservation', 'post', data);
          setMsgReserv(true);
        }
      
      
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  return (
    <>
    {!msgReserv ?
    <section>
      <Container>
        <Row>
          <Col>
            <h2>Reserva tu experiencia</h2>

            <Form className="px-4 pt-4">
              <Form.Group className="mb-3">
                <Form.Label>Experiencia</Form.Label>
                <Form.Select
                  name="reservation_experience_id"
                  value={reservation.reservation_experience_id}
                  onChange={handleChange}
                  id="formBasicExperience"
                >
                  <option>Selecciona una experiencia</option>
                  {experiences.map((elem, index) => {
                    return (
                      <option key={index} value={elem.id}>
                        {elem.title}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ruta</Form.Label>

                <Form.Select
                  value={reservation.reservation_hike_id}
                  name="reservation_hike_id"
                  onChange={handleChange}
                  id="formBasicHike"
                  disabled={!reservation.reservation_experience_id}
                >
                  <option value="">Selecciona una ruta</option>
                  {hikes?.map((elem, index) => {
                    return (
                      <option key={index} value={elem.hike_id}>
                        {elem.hike_title}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Número de adultos</Form.Label>

                <Form.Select
                  value={reservation.reservation_adult}
                  name="reservation_adult"
                  onChange={handleChange}
                  id="formBasicAdult"
                >
                  <option value="">Selecciona el número de adultos</option>
                  {numAdult.map((elem) => {
                    return <option key={elem}> {elem}</option>;
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Número de niños</Form.Label>

                <Form.Select
                  value={reservation.reservation_children}
                  name="reservation_children"
                  onChange={handleChange}
                  id="formBasicChild"
                >
                  <option value="">Selecciona el número de niños</option>
                  {numChildren.map((elem) => {
                    return <option key={elem}> {elem}</option>;
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" id="formBasicDate">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="reservation_date"
                  value={reservation.reservation_date}
                  onChange={handleChange}
                  min={
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hora de inicio</Form.Label>

                <Form.Select
                  value={reservation.reservation_time}
                  name="reservation_time"
                  onChange={handleChange}
                  id="formBasicTime"
                >
                  <option value="">Selecciona la hora</option>
                  {reservTime.map((elem) => {
                    return <option key={elem}> {elem}</option>;
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Introduzca algún extra o requerimiento que le pueda interesar
                  (intolerancias, peticiones,alimentos por encargo...).
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reservation.reservation_text}
                  name="reservation_text"
                  onChange={handleChange}
                  id="formBasicText"
                />
              </Form.Group>
              <div>
                <p>Precio por adulto: {hikes[0]?.experience_price_adult} €</p>
                <p>Precio por niño: {hikes[0]?.experience_price_child} €</p>
                <p>
                  Total:{isNaN(hikes[0]?.experience_price_adult *
                    reservation.reservation_adult +
                    hikes[0]?.experience_price_child *
                      reservation.reservation_children) ? " 0 " : hikes[0]?.experience_price_adult *
                        reservation.reservation_adult +
                        hikes[0]?.experience_price_child *
                          reservation.reservation_children}
                    €
                </p>
              </div>
              <span>{msg}</span>
              <div className="p-2 d-flex justify-content-center">
                <Button className="btn mb-3" onClick={onSubmit}>
                  Reservar
                </Button>
                <Button className="btn mb-3" onClick={()=> navigate('/user/perfil')}>Cancelar</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section> :
    <section>
      <Container>
        <Row>
          <Col>
          <p>Su reserva se realizó correctamente. Puedes ver todas tus reservas <Link to={'/user/perfil'} >aquí.</Link> </p>
          </Col>
        </Row>
      </Container>

    </section>}


    </>
  );
};
