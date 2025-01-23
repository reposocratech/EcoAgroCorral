
import { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AgroContext } from "../../context/ContextProvider";
import "./navbarApp.css";
import logoAgro from "../../../public/assets/images/navbar/LogoAgro.png";


export const NavbarApp = () => {
  const { user, setUser, setToken } = useContext(AgroContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setUser();
    setToken();
    navigate("/");
  };

  return (

      <Navbar expand="lg" className="navbar fixed-top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src={logoAgro} alt="EcoAgroCorral" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{
              borderColor: "white",
              height: "30px",
            }}
          >
            <span
              style={{
                backgroundColor: "white",
                display: "block",
                height: "2px",
                width: "20px",
                marginBottom: "4px",
              }}
            ></span>
            <span
              style={{
                backgroundColor: "white",
                display: "block",
                height: "2px",
                width: "20px",
                marginBottom: "4px",
              }}
            ></span>
            <span
              style={{
                backgroundColor: "white",
                display: "block",
                height: "2px",
                width: "20px",
              }}
            ></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 text-center gap-4" navbarScroll>
              <Nav.Link as={Link} className="item m-0" to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} className="item m-0" to="/sobreNosotros">
                Sobre Nosotros
              </Nav.Link>
              <Nav.Link as={Link} className="item m-0" to="/experiencias">
                Experiencias rurales
              </Nav.Link>
              <Nav.Link as={Link} className="item m-0" to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} className="item m-0" to="/contacto">
                Contacto
              </Nav.Link>
              {user?.user_type === 1 && <Nav.Link as={Link} className="item m-0" to="/admin/perfil">
                Admin</Nav.Link>}
              {user?.user_type === 0 && <Nav.Link as={Link} className="item m-0" to="/user/perfil">
                Perfil</Nav.Link>}
            </Nav>
            <div className="d-flex justify-content-center align-items-center">
              {!user ? (
                <div className="d-flex gap-2">
                  <Button onClick={() => navigate("user/register")}>
                    Regístrate
                  </Button>
                  <Button className="btnLogin" onClick={() => navigate("user/login")}>Iniciar sesión</Button>
                </div>
              ) : (
                <div>
                  <Button onClick={logOut}>Cerrar sesión</Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

