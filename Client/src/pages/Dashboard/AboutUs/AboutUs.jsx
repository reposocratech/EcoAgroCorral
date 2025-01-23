import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./about.css";
import perfil from "../../../../public/assets/images/about/perfil.jpg";
import tradition from "../../../../public/assets/images/about/tradition.jpg";

export const AboutUs = () => {
  return (
    <>
      <section className="pictures">
        <Container fluid>
          <Row className="first-sec d-flex flex-column">
            <Col>
              <h2 className="about">Sobre Nosotros</h2>
            </Col>
          </Row>
          <Row className="agro justify-content-center">
            <h2>Agroturismo</h2>
            <Col xl={4} lg={6} md={8}>
              <article>
                <p className="text text-center">
                  Somos una familia de agricultores ecológicos que siempre hemos
                  vivido en el pueblo de Barracas en el interior sur de la
                  provincia de Castellón. Estamos muy comprometidos con nuestra
                  tierra. Por eso hemos decidido ofrecer agroturismo para poner
                  en valor el mundo rural y evitar así la desaparición de su
                  cultura rural. Te ofrecemos una inmersión en el mundo rural en
                  un entorno de gran belleza paisajística rodeado de campos de
                  cereal y carrascas truferas en contacto directo con la
                  naturaleza.
                </p>
              </article>
            </Col>
          </Row>
          <Row className="tree justify-content-center">
            <Col xl={4} lg={6} md={8}>
              <article>
                <p className="text text-center">
                  En un lugar rodeado de tranquilidad y tradición, ideal para
                  aquellas personas de entornos urbanos que busquen una escapada
                  a entornos rurales, para conseguir la desconexión de su rutina
                  diaria y la conexión con uno mismo, revivir sus orígenes, en
                  definitiva, disfrutar de su tiempo libre en compañía de
                  familia y amigos.
                </p>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="aboutMe">
        <Container>
          <Row className="justify-content-center">
            <Col xl={10} lg={12} className="d-flex justify-content-center">
              <h2>Conóceme</h2>
              <article className="d-flex align-items-center">
                <img src={perfil} alt="foto de perfil" className="perfil " />
                <div className="p-4">
                  <p>Mi nombre es Raquel, soy emprendedora, amante de la naturaleza y trabajadora. Miembro de la junta directiva de
                    varias asociaciones culturales y festivas patronales de
                    tradiciones en la localidad de Barracas.
                  </p>
                  <p >
                    Al vivir en un pueblo toda la vida veo como se van
                    perdiendo algunas de las tradiciones más antiguas y creo que
                    podemos solucionarlo con nuestro proyecto de agroturismo. Al
                    poner en valor el mundo rural revitalizándolo, fomentando el
                    respeto por las tradiciones y su entorno natural.
                  </p>
                </div>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="aboutMe">
        <Container>
          <Row className="justify-content-center">
            <Col xl={10} lg={12} className="d-flex justify-content-center">
              <h2 className="tradition">Tradición y Sostenibilidad</h2>
              <article className="d-flex align-items-center">
                <div className="p-5">
                  <p>
                    Ofrecemos alojamientos de agroturismo, rehabilitando
                    próximamente edificaciones de gran valor etnográfico,
                    actualmente en desuso, evitando que acaben siendo ruinas
                    olvidadas.
                  </p>
                  <p>
                    Utilizando de manera sostenible los recursos naturales,
                    patrimoniales y culturales propios de nuestra cultura rural,
                    contribuyendo así a su conservación y divulgación.
                    Fomentando el respeto por las tradiciones y la naturaleza.
                  </p>
                  <p>
                    Consiguiendo preservar nuestra historia y darle un nuevo
                    propósito para evitar que la cultura rural caiga en el
                    olvido.
                  </p>
                </div>
                <img
                  src={tradition}
                  alt="foto de perfil"
                  className="tradition-img"
                />
              </article>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
