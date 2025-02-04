import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ZodError } from "zod";
import { Row, Button, Col, Form, Container } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { registerSchema } from "../../../schemas/registerSchema.js";
import logoAgro from "../../../../public/assets/images/LogoAgro.png";
import "./Register.css";

const initialValue = {
  user_name: "",
  user_lastname: "",
  user_birthdate: "",
  user_email: "",
  user_address: "",
  user_phone: "",
  user_dni: "",
  user_password: "",
  repPassword: "",
};

export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [msg, setMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const validateField = (name, value) => {
    try {
      registerSchema.pick({ [name]: true }).parse({ [name]: value });
      setValErrors({ ...valErrors, [name]: "" });
    } catch (error) {
      const errorMessage = error.errors?.[0]?.message;
      setValErrors({ ...valErrors, [name]: errorMessage });
    }
  };

  const handleDateChange = () => {
    if (day && month && year) {
      const formattedDay = String(day).padStart(2, "0");
      const formattedMonth = String(month).padStart(2, "0");
      const birthdate = `${year}-${formattedMonth}-${formattedDay}`;
      setRegister((prev) => ({ ...prev, user_birthdate: birthdate }));
      validateField("user_birthdate", birthdate);
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [day, month, year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    validateField(name, value);
  };

  const onSubmit = async () => {
    try {
      setMsg("");
      setEmailSent(false);

      registerSchema.parse(register);

      if (register.user_password !== register.repPassword) {
        setValErrors({
          ...valErrors,
          repPassword: "Las contraseñas deben coincidir",
        });
        return;
      }

      const res = await fetchData("api/user/register", "post", register);

      setEmailSent(true);
      setMsg(
        `Hemos enviado un enlace a ${register.user_email} para que puedas verificar tu cuenta.`
      );
      setRegister(initialValue);
      setDay("");
      setMonth("");
      setYear("");
    } catch (error) {
      
      if (error instanceof ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setValErrors(fieldErrors);
      } 
      if (error.msg) {
        setMsg(error.msg);
      } else {
        setMsg("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
    }

    if (
      !register.user_name ||
      !register.user_lastname ||
      !register.user_birthdate ||
      !register.user_email ||
      !register.user_address ||
      !register.user_phone ||
      !register.user_dni ||
      !register.user_password ||
      !register.repPassword
    ) {
      setMsg("No puede haber ningún campo vacío");
    } else if (register.user_password !== register.repPassword) {
      setMsg("Las contraseñas deben coincidir");
    }
  };

  return (
    <section>
      <Container fluid="xxl">
        <Row className="d-flex justify-content-center">
          <Col
            lg={4}
            md={6}
            className="d-flex flex-column shadow my-5 register"
          >
            <img src={logoAgro} alt="LogoAgro" className="mx-auto" />
            <h2 className="text-center mt-2 fw-bold">CREA UNA CUENTA</h2>
            <div className="separator"></div>
            {emailSent ? (
              <p className="text-center p-4 mt-3 fw-bold">{msg}</p>
            ) : (
              <Form className="px-4 pt-4">
                <Form.Group className="mb-1">
                  <div className="d-flex gap-3">
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      value={register.user_name}
                      onChange={handleChange}
                      name="user_name"
                      id="formBasicName"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Apellido"
                      value={register.user_lastname}
                      onChange={handleChange}
                      name="user_lastname"
                      id="formBasicLastname"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    {valErrors.user_name && <span>{valErrors.user_name}</span>}
                    {valErrors.user_lastname && (
                      <span>{valErrors.user_lastname}</span>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Select
                      value={day}
                      onChange={(e) => {
                        setDay(e.target.value);
                      }}
                      id="formBasicDay"
                    >
                      <option value="">Día</option>
                      {Array.from({ length: 31 }, (value, i) => (
                        <option
                          key={i + 1}
                          value={String(i + 1).padStart(2, "0")}
                        >
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Select
                      value={month}
                      onChange={(e) => {
                        setMonth(e.target.value);
                      }}
                      id="formBasicMonth"
                    >
                      <option value="">Mes</option>
                      {Array.from({ length: 12 }, (value, i) => (
                        <option
                          key={i + 1}
                          value={String(i + 1).padStart(2, "0")}
                        >
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Select
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                      id="formBasicYear"
                    >
                      <option value="">Año</option>
                      {Array.from({ length: 83 }, (value, i) => {
                        const actualYear = new Date().getFullYear();
                        const menorEdad = actualYear - 18;
                        const maxYear = actualYear - 100;
                        return menorEdad - i >= maxYear ? menorEdad - i : null;
                      }).map(
                        (year) =>
                          year && (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                      )}
                    </Form.Select>
                  </div>
                  {valErrors.user_birthdate && (
                    <span>{valErrors.user_birthdate}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Introduce el email"
                    value={register.user_email}
                    onChange={handleChange}
                    name="user_email"
                  />
                  {valErrors.user_email && <span>{valErrors.user_email}</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Control
                    type="text"
                    placeholder="Introduce la dirección"
                    value={register.user_address}
                    onChange={handleChange}
                    name="user_address"
                  />
                  {valErrors.user_address && (
                    <span>{valErrors.user_address}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Control
                    type="text"
                    placeholder="Introduce tu teléfono"
                    value={register.user_phone}
                    onChange={handleChange}
                    name="user_phone"
                  />
                  {valErrors.user_phone && <span>{valErrors.user_phone}</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDni">
                  <Form.Control
                    type="text"
                    placeholder="Introduce tu NIF"
                    value={register.user_dni}
                    onChange={handleChange}
                    name="user_dni"
                  />
                  {valErrors.user_dni && <span>{valErrors.user_dni}</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={register.user_password}
                    onChange={handleChange}
                    name="user_password"
                  />
                  {valErrors.user_password && (
                    <span>{valErrors.user_password}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRepPassword">
                  <Form.Control
                    type="password"
                    placeholder="Repite contraseña"
                    value={register.repPassword}
                    onChange={handleChange}
                    name="repPassword"
                  />
                  {valErrors.repPassword && (
                    <span>{valErrors.repPassword}</span>
                  )}
                </Form.Group>
                <span>{msg}</span>
                <div className="p-2 d-flex justify-content-center">
                  <Button className="btn mb-3" onClick={onSubmit}>
                    Registrar
                  </Button>
                </div>
              </Form>
            )}
            <div className="separator mb-4"></div>
            <p className="text-center pt-2 mb-4">
              ¿Ya tienes una cuenta?
              <Link to="/user/login" className="ms-2 link">
                Inicia sesión
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
