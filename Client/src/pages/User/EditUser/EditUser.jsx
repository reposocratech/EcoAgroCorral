import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../helpers/axiosHelper";
import { AgroContext } from "../../../context/ContextProvider";
import logoAgro from "../../../../public/assets/images/LogoAgro.png";
import "./EditUser.css"

const initialValue = {
  user_name: "",
  user_lastname: "",
  user_address: "",
  user_phone: "",
  user_birthdate: "",
};

export const EditUser = () => {
  const { user, setUser } = useContext(AgroContext);
  const [edit, setEdit] = useState(initialValue);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
        setEdit(user)
    }
}, [user])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
};

const onSubmit = async () => {
  try {
    setMsg("");

    if (
      !edit.user_name ||
      !edit.user_lastname ||
      !edit.user_address ||
      !edit.user_phone ||
      !edit.user_birthdate
    ) {
      setMsg("Debes cumplimentar todos los datos");
      return;
    }

    const formData = new FormData();
    formData.append("edit", JSON.stringify(edit));

    if (file) {
      formData.append("file", file);
    } else {
      formData.append("user_avatar", user.user_avatar || "");
    }

    console.log("Datos enviados:", [...formData]);
    const res = await fetchData("api/user/editUser", "put", formData);

    setUser({
      ...edit,
      user_avatar: file ? res.img : user.user_avatar,
    });

    navigate("/user/perfil");
  } catch (error) {
    console.error("Error en la edición del usuario:", error);
    setMsg("Error al guardar los cambios. Inténtalo de nuevo más tarde.");
  }
};

  return (
    <section>
    <Container fluid="xxl">
      <Row className="d-flex justify-content-center">
        <Col md={4} lg={6} className="d-flex flex-column shadow my-5 edit">
          <img src={logoAgro} alt="LogoAgro" className="mx-auto" />
            <h2 className="text-center mt-2 fw-bold">EDITAR PERFIL</h2>
            <div className="separator"></div>
          <Form className="px-4 pt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="fw-bold">Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu nombre"
                name="user_name"
                value={edit.user_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastname">
              <Form.Label className="fw-bold">Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu apellido"
                name="user_lastname"
                value={edit.user_lastname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className="fw-bold">Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu dirección"
                name="user_address"
                value={edit.user_address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label className="fw-bold">Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu teléfono"
                name="user_phone"
                value={edit.user_phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthDate">
              <Form.Label className="fw-bold">Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Introduce tu fecha de nacimiento"
                name="user_birthdate"
                value={edit.user_birthdate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAvatar">
              <Form.Label className="fw-bold">Imagen de perfil</Form.Label>
              <Form.Control type="file" onChange={handleFile} />
            </Form.Group>
            <span>{msg}</span>
            <div className="p-2 d-flex justify-content-center mb-4">
              <Button onClick={onSubmit} className="btnAcept">
                Aceptar
              </Button>
              <Button
                className="ms-2 btnCancel"
                onClick={() => navigate("/user/perfil")}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </section>
  );
};
