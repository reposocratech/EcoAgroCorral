import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { AgroContext } from "../../../context/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import reservationImg from "../../../../public/assets/images/reservation/reservation.png";
import "./reservation.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

const initialValue = {
  reservation_experience_id: "",
  reservation_hike_id: "",
  reservation_text: "",
  reservation_date: null,
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
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AgroContext);

  const convertDate = dates.map((date) => new Date(date));

  const numAdult = Array.from({ length: 20 }, (value, i) => i + 1);
  const numChildren = Array.from(
    { length: 21 - reservation?.reservation_adult },
    (value, i) => i
  );

  const reservTime = Array.from(
    { length: 5 },
    (value, i) => `${parseInt(i / 2) + 9}:${i % 2 === 0 ? "00" : "30"}`
  );

  useEffect(() => {
    registerLocale("es", es);
    const fetchExperience = async () => {
      try {
        const result = await fetchData("api/user/getExperience", "get");
        setData(result);

        const reservationsDate = await fetchData(
          "api/reservation/getDates",
          "get"
        );

        const reservationsDays = await fetchData(
          "api/reservation/getDays",
          "get"
        );

        if(days.length == 0){
          for(let elem of reservationsDays){
            days.push(parseInt(elem.reservation_day_value));
          }
        }
    
        if (dates.length == 0) {
          for (let elem of reservationsDate) {
            dates.push(elem.reservation_date);
          }
        }

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
      if (
        !reservation.reservation_experience_id ||
        !reservation.reservation_hike_id ||
        !reservation.reservation_date ||
        !reservation.reservation_time
      ) {
        setMsg("Debes cumplimentar todos los campos");
      } else if (
        parseInt(reservation.reservation_adult) +
          parseInt(reservation.reservation_children) <
        2
      ) {
        setMsg("La reserva debe ser de un mínimo de dos personas.");
      } else {
        const data = 
          {
            ...reservation,
            reservation_total_price:
              hikes[0]?.experience_price_adult * reservation.reservation_adult +
              hikes[0]?.experience_price_child *
                reservation.reservation_children,
            reservation_user_id: user.user_id,
          };

        localStorage.setItem("reservationData", JSON.stringify(data));
        const payment = await fetchData("api/payment/create-payment-intent", "post", data);
        window.location.href = payment;
        
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  return (
    <>
        <section>
          <Container fluid="xxl" className="py-5">
            <Row className="reservation mx-1">
              <Col xs={12}>
                <h2 className="text-center pb-2 pt-4">
                  Reserva tu experiencia
                </h2>
                {user?.user_type === 1 && <p className="text-center text-danger fw-bold fs-5 mark">REVISA Y AJUSTA LOS CAMPOS DEL FORMULARIO PARA ASEGURARTE DE QUE TODO ESTÉ COMO LO NECESITAS.</p>}
                <div className="divisor mb-4"></div>
              </Col>
              <Col lg={6} className="d-flex flex-column align-items-center">
                <img src={reservationImg} alt="" />
                <div className="pt-4 fw-bold text-center price mt-4">
                  <p>
                    Precio por adulto:{" "}
                    {hikes[0]?.experience_price_adult
                      ? hikes[0]?.experience_price_adult
                      : "0"}{" "}
                    €
                  </p>
                  <p>
                    Precio por niño:{" "}
                    {hikes[0]?.experience_price_child
                      ? hikes[0]?.experience_price_child
                      : "0"}{" "}
                    €
                  </p>
                  <p>
                    Total:
                    {isNaN(
                      hikes[0]?.experience_price_adult *
                        reservation.reservation_adult +
                        hikes[0]?.experience_price_child *
                          reservation.reservation_children
                    )
                      ? " 0 "
                      : hikes[0]?.experience_price_adult *
                          reservation.reservation_adult +
                        hikes[0]?.experience_price_child *
                          reservation.reservation_children}
                    €
                  </p>
                </div>
              </Col>

              <Col lg={6}>
                <Form className="px-4">
                  <Form.Group className="mb-3">
                    <Form.Label>Experiencia</Form.Label>
                    <Form.Select
                      name="reservation_experience_id"
                      value={reservation.reservation_experience_id || ""}
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
                      value={reservation.reservation_hike_id || ""}
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
                      value={reservation.reservation_adult || ""}
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
                      value={reservation.reservation_children || ""}
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

                  <div className="d-flex flex-column">
                    <Form.Label>Fecha</Form.Label>

                    <DatePicker
                      className="input-date mb-3 p-2"
                      name="reservation_date"
                      value={reservation.reservation_date || ""}
                      onChange={(date) =>
                        setReservation({
                          ...reservation,
                          reservation_date: new Date(
                            date.getTime() - date.getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .split("T")[0],
                        })
                      }
                      minDate={
                        new Date(Date.now() + 86400000)
                          .toISOString()
                          .split("T")[0]
                      }
                      excludeDates={convertDate}
                      filterDate={(date) => days?.includes(date.getDay())} 
                      selected={reservation.reservation_date}
                      placeholderText="Selecciona una fecha"
                      locale="es"
                    />
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Hora de inicio</Form.Label>

                    <Form.Select
                      value={reservation.reservation_time || ""}
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
                      Introduzca algún extra o requerimiento que le pueda
                      interesar (intolerancias, peticiones,alimentos por
                      encargo...).
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={reservation.reservation_text || ""}
                      name="reservation_text"
                      onChange={handleChange}
                      id="formBasicText"
                    />
                  </Form.Group>

                  <span>{msg}</span>
                </Form>
              </Col>
              <Col xs={12}>
                <div className="p-3 d-flex justify-content-center gap-4">
                  <Button className="btn mb-3" onClick={onSubmit}>
                    Reservar
                  </Button>
                  <Button
                    className="btn mb-3"
                    onClick={() => navigate("/user/perfil")}
                  >
                    Cancelar
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      
     
    </>
  );
};
