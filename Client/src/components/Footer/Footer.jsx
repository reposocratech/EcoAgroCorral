
import {Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import whatsappIcon from "../../../public/assets/icons/whatsapp-icon.svg";
import mailIcon from "../../../public/assets/icons/mail.svg";
import facebookIcon from "../../../public/assets/icons/facebook.svg";
import instagramIcon from "../../../public/assets/icons/instagram.svg";
import tiktokIcon from "../../../public/assets/icons/tiktok.svg";
import logo from "../../../public/assets/images/LogoAgro.png";

import "./footer.css";

export const Footer = () => {
  return (
    <Container fluid className="footer-cont">
      <Row className="px-5 pt-5">
        <Col md={4} className="px-5">
          <div className="d-flex flex-column align-items-center div-height">
            <p>Contactanos:</p>
            <div className="d-flex gap-2 align-items-end">
              <img className="icon-size" src={whatsappIcon} alt="Icon of Whatsapp" />
              <p>+34 644 80 30 31</p>
            </div>
            <div className="d-flex gap-2 align-items-end">
              <img className="icon-size" src={mailIcon} alt="Email icon" />
              <p>+34 644 80 30 31</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column align-items-center div-height">
            <Link to="/">
              <img src={logo} alt="Logo de la empresa" />
            </Link>
            <p className="text-logo">Vive una experiencia inolvidable</p>
          </div>
        </Col>
        <Col md={4} className="px-5">
          <div className="d-flex flex-column align-items-center div-height">
            <p>Donde estamos:</p>
            <p>Calle La Fuente 1, Barracas (Castellón) 12420 España</p>
          </div>
        </Col>
      </Row>
      <Row className="px-5 pb-5">
        <Col md={4} className="px-5">
          <div className="d-flex d-flex align-items-end justify-content-center div-height">
            <p>Ecoagrotour © 2025. Todos los Derechos Reservados</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-flex gap-2 align-items-end justify-content-center div-height">
            <Link to="https://www.tiktok.com/@ecoagrocorral_">
              <img className="icon-size" src={tiktokIcon} alt="Email icon" />
            </Link>
            <Link to="https://www.instagram.com/ecoagrocorral/">
              <img className="icon-size" src={instagramIcon} alt="Email icon" />
            </Link>
            <Link to="https://www.facebook.com/people/Ecoagrocorral/61561636066521/">
              <img className="icon-size" src={facebookIcon} alt="Email icon" />
            </Link>
          </div>
        </Col>
        <Col md={4} className="px-5">
          <div className="d-flex align-items-end justify-content-center div-height">
            <p>Política de privacidad  |  Cookies  |  Aviso Legal</p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
