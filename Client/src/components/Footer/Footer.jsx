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
      <Row className="px-5 pt-4">
        <Col md={2}></Col>
        <Col md={2}>
          <div className="d-flex flex-column text-center mb-3 ps-md-5 ps-5">
            <Link to="/sobreNosotros" className="textVarios">
              <FaUsers className="fs-5 mx-2 " /> Sobre nosotros
            </Link>
            <Link to="/" className="textVarios">
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
              <img src={logo} alt="Logo de la empresa" />
            </Link>
            <p className="text-logo text-center">
              Vive una experiencia inolvidable
            </p>
          </div>
        </Col>
        <Col md={4} className="px-5">
          <div className="d-flex flex-column div-height gap-2 mb-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Calle+La+Fuente+1,+12420,+Barracas,+Castellón"
              target="_blank"
              rel="noopener noreferrer"
              className="textContact"
            >
              <FaMapMarkedAlt className="fs-4 mx-2" /> Calle La Fuente 1, 12420,
              Barracas, Castellón
            </a>
            <a href="" className="text-decoration-none text-dark textContact">
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

      <Row className="px-5 pb-2 subfoot text-white">
        <Col md={4} className="px-2">
          <div className="d-flex d-flex justify-content-center">
            <p className="text-center">
              Ecoagrocorral © 2025. Todos los Derechos Reservados
            </p>
          </div>
        </Col>
        <Col md={4} className="px-2">
          <div className="d-flex d-flex align-items-center justify-content-center div-height">
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
          <p className="fw-semibold d-flex d-flex justify-content-center">
            Cookies | Aviso Legal
          </p>
        </Col>
      </Row>
    </Container>
  );
};
