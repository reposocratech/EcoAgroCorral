import { useContext } from "react";
import { Row, Navbar, Container, Nav, Button } from "react-bootstrap";
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
    
      <Navbar expand="lg" className="navbar">
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
            <Nav className="me-auto my-2 my-lg-0 text-center" navbarScroll>
              <Nav.Link as={Link} className="item" to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} className="item" to="/sobreNosotros">
                Sobre Nosotros
              </Nav.Link>
              <Nav.Link as={Link} className="item" to="/">
                Experiencias rurales
              </Nav.Link>
              <Nav.Link as={Link} className="item" to="/">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} className="item" to="/">
                Contáctanos
              </Nav.Link>
            </Nav>
            <div className="d-flex justify-content-center align-items-center">
              {!user ? (
                <div className="d-flex">
                  <Button onClick={() => navigate("/register")}>
                    Register
                  </Button>
                  <Button className="btn" onClick={() => navigate("login")}>Login</Button>
                </div>
              ) : (
                <div>
                  <Button onClick={logOut}>Logout</Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  );
};
