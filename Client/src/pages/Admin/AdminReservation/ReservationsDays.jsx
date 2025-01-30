import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper";
import "./reservationsDays.css";

export const ReservationsDays = () => {
  const [availableDays, setAvailableDays] = useState();
  const [newDays, setNewDays] = useState();
  const [days, setDays] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const result = await fetchData("api/reservation/getDays", "get");
        setAvailableDays(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDays();
  }, [newDays]);



  const handleChangeDays = (e) => {
    const value = parseInt(e.target.value, 10);
    setDays((prevDays) =>
      prevDays.includes(value)
        ? prevDays.filter((day) => day !== value)
        : [...prevDays, value]
    );
    setNewDays();
    setMsg("");
  };

  const onSubmit = async () => {
    try {
      if (days.length == 0) {
        setMsg("Debes seleccionar una opción.");
      } else {
        const result = await fetchData("api/reservation/setDays", "put", days);
        setNewDays(days);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <section className="reservation-days">
        <Container fluid="xxl" className="py-5">
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
              <article className="form-days p-4 d-flex flex-column align-items-center">
                <div className="divisor mb-3"></div>
                <p className="fw-bold fs-5">
                  Selecciona los nuevos días disponibles para reservar:
                </p>
                <Form>
                  <Form.Check
                    inline
                    label="Lunes"
                    name="day"
                    value={1}
                    onChange={handleChangeDays}
                  />
                  <Form.Check
                    inline
                    label="Martes"
                    name="day"
                    value={2}
                    onChange={handleChangeDays}
                  />
                  <Form.Check
                    inline
                    label="Miércoles"
                    name="day"
                    value={3}
                    onChange={handleChangeDays}
                  />
                  <Form.Check
                    inline
                    label="Jueves"
                    name="day"
                    value={4}
                    onChange={handleChangeDays}
                  />
                  <Form.Check
                    inline
                    label="Viernes"
                    name="day"
                    value={5}
                    onChange={handleChangeDays}
                  />
                  <Form.Check
                    inline
                    label="Sabado"
                    name="day"
                    value={6}
                    onChange={handleChangeDays}
                  />
                  <Form.Check
                    inline
                    label="Domingo"
                    name="day"
                    value={0}
                    onChange={handleChangeDays}
                  />

                  <div className="d-flex justify-content-center mt-3">
                    <Form.Check
                      inline
                      label="Deshabilitar todos los días."
                      name="day"
                      value={7}
                      onChange={handleChangeDays}
                    />
                  </div>
                </Form>
                <Button className="m-3 btn" onClick={onSubmit}>
                  Modificar
                </Button>
                <div className="divisor"></div>
                {availableDays?.length != 0 ? 
                  <p className="mt-3">
                    Los días disponibles actualmente son:{" "}
                    <span className="days fw-bold">
                      {" "}
                      {availableDays?.map((elem) => {
                        return elem.reservation_day_name + ", ";
                      })}
                    </span>{" "}
                    ¿quieres modificarlos?
                  </p>:
                  <p className="mt-3">No hay días disponibles para reservar en este momento.</p>
                }
                <span>{msg}</span>
              </article>
            </Col>
            {newDays && (
              <Col xs={12} className="d-flex justify-content-center">
                <article className="msg-days p-2 mt-3">
                  <p>
                    {" "}
                    ✔ Se han modificado correctamente los días disponibles para
                    reservar.{" "}
                  </p>
                </article>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};
