import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/images/LogoAgro.png";
import "./footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaMapMarkedAlt,
  FaPenNib,
  FaPhoneAlt,
  FaShieldAlt,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <Container fluid className="footer-cont">
      <Row className="pt-4">
        <Col md={4}>
          <div className="d-flex flex-column text-center align-items-center mb-3">
            <Link to="/sobreNosotros" className="textVarios">
              <FaUsers className="fs-5 mx-2 " /> Sobre nosotros
            </Link>
            <Link to="/blog" className="textVarios">
              <FaPenNib className="fs-5 mx-2" /> Blog
            </Link>
            <Link to="/contacto" className="textVarios">
              <FaPhoneAlt className="fs-5 mx-2" /> Contacto
            </Link>
            <Link className="textVarios">
              <FaShieldAlt className="fs-5 mx-2" /> Política de privacidad
            </Link>
          </div>
        </Col>
        <Col md={4} className="px-5">
          <div className="d-flex flex-column align-items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Logo de la empresa"
                className="logoEmpresa"
              />
            </Link>
            <p className="text-logo text-center">
              Vive una experiencia inolvidable
            </p>
          </div>
        </Col>
        <Col md={4} className="px-5">
          <div className="d-flex flex-column gap-2 mb-3 text-center align-items-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Calle+La+Fuente+1,+12420,+Barracas,+Castellón"
              target="_blank"
              rel="noopener noreferrer"
              className="textContact"
            >
              <FaMapMarkedAlt className="fs-4 mx-2" /> Calle La Fuente 1, 12420,
              Barracas, Castellón
            </a>
            <a
              href="https://wa.me/34644803031?text=Hola%20EcoAgroCorral,%20tengo%20una%20consulta." 
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark text textContact"
            >
              <FaWhatsapp className="fs-4 mx-2" /> +34 644 80 30 31
            </a>
            <a
              href="mailto:ecoagrocorral@gmail.com"
              className="text-decoration-none text-dark textContact"
            >
              <FaMailBulk className="fs-4 mx-2" /> ecoagrocorral@gmail.com
            </a>
          </div>
        </Col>
      </Row>
      <Row className="px-5 subfoot text-white d-flex justify-content-center align-items-center">
        <Col md={4} className="px-2">
          <div className="d-flex justify-content-center">
            <p className="text-center">
              Ecoagrocorral © 2025. Todos los Derechos Reservados
            </p>
          </div>
        </Col>
        <Col md={4} className="px-2">
          <div className="d-flex align-items-center justify-content-center">
            <p className="text-center">
              <a
                href="https://www.instagram.com/ecoagrocorral/"
                target="_blank"
                rel="noopener noreferrer"
                className="logoRRSS"
              >
                <FaInstagram className="mx-2 fs-4" />
              </a>
              <a
                href="https://www.facebook.com/people/Ecoagrocorral/61561636066521/"
                target="_blank"
                rel="noopener noreferrer"
                className="logoRRSS"
              >
                <FaFacebook className="mx-2 fs-4" />
              </a>
            </p>
          </div>
        </Col>
        <Col md={4} className="px-2">
          <p className="fw-semibold d-flex justify-content-center">
            Cookies | Aviso Legal
          </p>
        </Col>
      </Row>
    </Container>
  );
};
