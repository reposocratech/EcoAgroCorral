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
            <Col >
              <div className="container">
                <h2 className="mb-3 mt-5">Mi panel de administrador</h2>
                <div className="separator"></div>
                <p className="text-muted">
                  Bienvenido al panel de administración. Usa las opciones a
                  continuación para gestionar usuarios, experiencias y reservas.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col xs={12} md={6} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Gestión de Usuarios</Card.Title>
                  <Card.Text>
                    Habilita o deshabilita usuarios según sea necesario.
                  </Card.Text>
                  <Button onClick={() => navigate("/admin/usuarios")}>
                    Ir a Usuarios
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Gestión de Experiencias y Rutas</Card.Title>
                  <Card.Text>
                    Crea, modifica o elimina experiencias o rutas para ofrecer a los
                    usuarios.
                  </Card.Text>
                  <Button onClick={() => navigate("/experiencias")}>
                    Ir a Experiencias
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={12} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>Gestión de Reservas</Card.Title>
                  <Card.Text>
                    Consulta y gestiona el historial y las reservas actuales
                    realizadas en la plataforma.
                  </Card.Text>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button onClick={() => navigate("/admin/historial-reservas")}>
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
          </Row>
        </Container>
      </section>
    </>
  );
};
