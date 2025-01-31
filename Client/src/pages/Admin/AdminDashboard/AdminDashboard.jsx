import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper.js";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetchData("api/admin/getAllUsers", "get");
        setAllUser(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <section className="adminDash">
        <Container fluid>
          <Row className="d-flex flex-column justify-content-center align-items-center text-center mb-4">
            <Col>
              <div className="container">
                <h2 className="mb-3 mt-4">Mi panel de administrador</h2>
                <div className="separator"></div>
                <p className="text-muted">
                  Bienvenido al panel de administración. Usa las opciones a
                  continuación para gestionar usuarios, experiencias y reservas.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col xs={12} md={6} lg={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">Gestión de Usuarios</Card.Title>
                  <Card.Text>
                    Habilita o deshabilita usuarios según sea necesario.
                  </Card.Text>
                  <Button onClick={() => navigate("/admin/usuarios")}>
                    Ir a Usuarios
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">Gestión de Reservas</Card.Title>
                  <Card.Text>
                    Consulta y gestiona el historial y las reservas actuales
                    realizadas en la plataforma.
                  </Card.Text>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button
                      onClick={() => navigate("/admin/historial-reservas")}
                    >
                      Ver Historial de Reservas
                    </Button>
                    <Button
                      onClick={() => navigate("/admin/reservas-pendientes")}
                    >
                      Ver Reservas Pendientes
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">Gestión de Experiencias</Card.Title>
                  <Card.Text>
                    Crea, habilita o deshabilita experiencias según sea necesario.
                  </Card.Text>
                  <div className="d-flex gap-2 justify-content-center">
                  <Button
                    onClick={() => navigate("/experiencias/createExperience")}
                  >
                    Ir a Crear nueva Experiencia
                  </Button>
                  <Button
                    onClick={() => navigate("/admin/experiencias")}
                  >
                    Ir a Experiencias Borradas
                  </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="fw-bold">Gestión de Rutas</Card.Title>
                  <Card.Text>
                    Crea, modifica o elimina rutas para ofrecer a los usuarios.
                  </Card.Text>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button onClick={() => navigate("/paseo/NuevoPaseo")}>
                      Ir a Crear nueva Ruta
                    </Button>
                    <Button onClick={() => navigate("/paseo/borrados")}>
                      Ir a Paseos Borrados
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
              <Col xs={12} md={6} lg={6}>
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">Gestión del Blog</Card.Title>
                    <Card.Text>
                    Crea, habilita o deshabilita post según sea necesario.

                    </Card.Text>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        onClick={() =>
                          navigate("/blog/crearPost")
                        }
                      >
                        Ir a Crear nuevo Post
                      </Button>
                      <Button
                        onClick={() =>
                          navigate("/admin/blog/categorias")
                        }
                      >
                        Ir a Gestión de Categorías
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">Gestión de Días</Card.Title>
                    <Card.Text>
                      Configura los días disponibles para reservas según las
                      necesidades del calendario.
                    </Card.Text>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        onClick={() =>
                          navigate("/admin/modificar-dias-disponibles")
                        }
                      >
                        Ir a Modificar Días
                      </Button>
                      <Button
                        onClick={() =>
                          navigate("/user/reserva")
                        }
                      >
                        Ir a Formulario Reservas
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
