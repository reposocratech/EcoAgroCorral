import {
  FaFacebook,
  FaHome,
  FaInstagram,
  FaMailBulk,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import "./ContactUs.css";

export const ContactUs = () => {
  return (
    <>
      <section className="contactUs">
        <Container fluid>
          <Row className="bgPhoto d-flex flex-column justify-content-center align-items-center text-center">
            <Col xs={12} md={8} lg={6}>
              <div className="container">
                <h2 className="mb-2">CONTÁCTANOS</h2>
                <div className="separator"></div>
                <p>
                  Si tienes cualquier duda escríbenos. Estoy encantada de hablar
                  contigo.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="icon-contactUs">
        <Container fluid="xxl">
          <Row className="row-gap-3 pb-5 pt-5">
            <Col xs={12} md={6} lg={3} className="flex-column d-flex">
              <div className="icon-contactUs-icon">
                <FaHome />
              </div>
              <div>
                <p className="fw-bold mb-1 mx-4 align-items-center justify-content-center d-flex flex-column mt-2 fs-4">
                  Visítanos
                </p>
                <p className="mx-4 m-0 align-items-center justify-content-center d-flex flex-column text-center mt-2 mb-3">
                  Nos localizamos en Barracas un municipio de Castellón lleno de
                  historia, rutas de senderismo, naturaleza virgen y la
                  tranquilidad perfecta para desconectar.
                </p>
                <p className="text-center mb-5 fw-bold">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Calle+La+Fuente+1,+12420,+Barracas,+Castellón"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text"
                  >
                    Calle La Fuente 1, 12420, Barracas, Castellón
                  </a>
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3} className="flex-column d-flex">
              <div className="icon-contactUs-icon">
                <FaWhatsapp />
              </div>
              <div>
                <p className="fw-bold mb-1 mx-4 align-items-center justify-content-center d-flex flex-column mt-2 fs-4">
                  Llámame
                </p>
                <p className="mx-4 m-0 align-items-center justify-content-center d-flex flex-column text-center mt-2 mb-3">
                  Me encanta recibir vuestras llamadas. ¡De vuestras dudas y
                  preguntas nacen ideas maravillosas! También podéis enviarnos
                  un WhatsApp. ¡Estaré encantada de atenderos!
                </p>
                <p className="text-center mb-5 fw-bold text">
                  <a
                    href="https://wa.me/34644803031?text=Hola%20EcoAgroCorral,%20tengo%20una%20consulta." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark text"
                  >
                    +34 644 80 30 31 - Raquel
                  </a>
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3} className="flex-column d-flex">
              <div className="icon-contactUs-icon">
                <FaMailBulk />
              </div>
              <div>
                <p className="fw-bold mb-1 mx-4 align-items-center justify-content-center d-flex flex-column mt-2 fs-4">
                  Escríbeme
                </p>
                <p className="mx-4 m-0 align-items-center justify-content-center d-flex flex-column text-center mt-2 mb-3">
                  Vuestros correos son siempre bienvenidos. Leer y responder
                  vuestras dudas me inspira y ayuda a crecer. ¡No dudéis en
                  escribirme, estoy aquí para ayudaros!
                </p>
                <p className="text-center mb-5 fw-bold">
                  <a
                    href="mailto:ecoagrocorral@gmail.com"
                    className="text-decoration-none text-dark text"
                  >
                    ecoagrocorral@gmail.com
                  </a>
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3} className="flex-column d-flex">
              <div className="icon-contactUs-icon">
                <FaShareAlt />
              </div>
              <div>
                <p className="fw-bold mb-1 mx-4 align-items-center justify-content-center d-flex flex-column mt-2 fs-4">
                  Sígueme
                </p>
                <p className="mx-4 m-0 align-items-center justify-content-center d-flex flex-column text-center mt-2 mb-3">
                  Síguenos en redes sociales para descubrir novedades, contenido
                  exclusivo, ideas y consejos. Únete a nuestra comunidad y
                  comparte esta experiencia única con nosotros.
                </p>
                <p className="text-center mb-5">
                  <a
                    href="https://www.instagram.com/ecoagrocorral/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="logo"
                  >
                    <FaInstagram className="mx-2 fs-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/people/Ecoagrocorral/61561636066521/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="logo"
                  >
                    <FaFacebook className="mx-2 fs-4" />
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
