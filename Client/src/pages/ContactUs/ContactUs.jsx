import {
  FaFacebook,
  FaHome,
  FaInstagram,
  FaMailBulk,
  FaShareAlt,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import "./ContactUs.css";
import { Link } from "react-router-dom";

export const ContactUs = () => {
  return (
    <>
      <section className="contactUs">
        <Container fluid>
          <Row className="bgPhoto d-flex flex-column justify-content-center align-items-center text-center">
            <Col xs={12} md={8} lg={6}>
              <div className="container">
                <h2 className="mb-3">CONTÁCTANOS</h2>
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

      <section className="icon">
        <Container fluid>
          <Row className="row-gap-3 pb-5">
            <Col className="pt-4 flex-column d-flex">
              <div className="fs-1 align-items-center justify-content-center flex-column m-auto">
                <FaHome className="home mt-5" />
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
                  Calle La Fuente 1, 12420, Barracas, Castellón
                </p>
              </div>
            </Col>
            <Col className="pt-4 flex-column d-flex">
              <div className="fs-1 align-items-center justify-content-center flex-column m-auto">
                <FaWhatsapp className="whatsapp mt-5" />
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
                <p className="text-center mb-5 fw-bold">
                  +34 644 80 30 31 - Raquel
                </p>
              </div>
            </Col>
            <Col className="pt-4 flex-column d-flex">
              <div className="fs-1 align-items-center justify-content-center flex-column m-auto">
                <FaMailBulk className="home mt-5" />
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
                  ecoagrocorral@gmail.com
                </p>
              </div>
            </Col>
            <Col className="pt-4 flex-column d-flex">
              <div className="fs-1 align-items-center justify-content-center flex-column m-auto">
                <FaShareAlt className="home mt-5" />
              </div>
              <div>
                <p className="fw-bold mb-1 mx-4 align-items-center justify-content-center d-flex flex-column mt-2 fs-4">
                  Sígueme
                </p>
                <p className="mx-4 m-0 align-items-center justify-content-center d-flex flex-column text-center mt-2 mb-3">
                  ¡No te pierdas nada! Síguenos en nuestras redes sociales y
                  mantente al día con novedades, ideas y contenido exclusivo.
                  ¡Únete a nuestra comunidad!
                </p>
                <p className="text-center mb-5">
                  <Link to="https://www.tiktok.com/@ecoagrocorral_" className="logo"><FaTiktok className="mx-2 fs-4" /></Link>
                  <Link to="https://www.instagram.com/ecoagrocorral/" className="logo"><FaInstagram className="mx-2 fs-4" /></Link>
                  <Link to="https://www.facebook.com/people/Ecoagrocorral/61561636066521/"><FaFacebook className="mx-2 fs-4" /></Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
