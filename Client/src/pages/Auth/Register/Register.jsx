import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Button, Col, Form } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { registerSchema } from "../../../schemas/registerSchema.js";
import { ZodError } from "zod";
import "./Register.css"

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
  const [msg, setMsg] = useState("");
  const [valErrors, setValErrors] = useState({})
  const navigate = useNavigate();

  const validateField = (name, value) => {
    try {
      registerSchema.pick({ [name]: true }).parse({ [name]: value }); 
      setValErrors({ ...valErrors, [name]: "" });
    } 
    catch (error) {
      setValErrors({ ...valErrors, [name]: error.errors[0]?.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    validateField(name, value);
  };

  const onSubmit = async () => {
    try {
      registerSchema.parse(register);

      if (register.user_password !== register.repPassword) {
        setValErrors({...valErrors,repPassword: "Las contraseñas deben coincidir"});
        return;
      }
      console.log("***** DATOS VÁLIDOS *****");

      const res = await fetchData("api/user/register", "post", register);
      console.log(res);
      navigate("/");

    } 
    catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setValErrors(fieldErrors);
      } else {
        console.error("Error en el servidor:", error);
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

    } 
    else if (register.user_password !== register.repPassword) {
      setMsg("Las contraseñas deben coincidir");
    } 
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col md={5} lg={4}>
        <Form>
          <h2>Formulario de Registro</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce tu nombre"
              value={register.user_name}
              onChange={handleChange}
              name="user_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastname">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce tu apellido"
              value={register.user_lastname}
              onChange={handleChange}
              name="user_lastname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBirthday">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Introduce tu fecha de nacimiento"
              value={register.user_birthdate}
              onChange={handleChange}
              name="user_birthdate"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduce el email"
              value={register.user_email}
              onChange={handleChange}
              name="user_email"
            />
          {valErrors.user_email && <p style={{ color: "red" }}>{valErrors.user_email}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce la dirección"
              value={register.user_address}
              onChange={handleChange}
              name="user_address"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce tu teléfono"
              value={register.user_phone}
              onChange={handleChange}
              name="user_phone"
            />
            {valErrors.user_phone && <p style={{ color: "red" }}>{valErrors.user_phone}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDni">
            <Form.Label>NIF</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce tu NIF"
              value={register.user_dni}
              onChange={handleChange}
              name="user_dni"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={register.user_password}
              onChange={handleChange}
              name="user_password"
            />
            {valErrors.user_password && <p style={{color:"red"}} >{valErrors.user_password}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRepPassword">
            <Form.Label>Repite contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repite contraseña"
              value={register.repPassword}
              onChange={handleChange}
              name="repPassword"
            />
          </Form.Group>
          <p style={{ color: "red" }}>{msg}</p>
          <Button variant="primary" onClick={onSubmit}>
            Registrar
          </Button>
          <Link to="/" className="ms-2">
            ¿Ya tienes una cuenta?
          </Link>
        </Form>
      </Col>
    </Row>
  );
};
