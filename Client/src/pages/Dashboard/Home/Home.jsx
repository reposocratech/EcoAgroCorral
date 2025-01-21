import "./style.css";
import { Button, Container, Row, Col } from "react-bootstrap";
export const Home = () => {
  return (
    <>
      <section className="section-1 mt">
        <Container fluid>
          <Row>
            <Col>
              <div className="div-1 d-flex flex-col justify-content-center align-items-center">
                <div className="text-center g-1">
                  <h2 className="subtitulo">Agroturismo</h2>
                  <h1 className="titulo">ECOAGROCORRAL</h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-2 ">
        <Container fluid="xxl">
          <Row>
            <Col>
              <div className="flexDiv">
                <div className="div-1">
                  <h3 className="text-center">Tranquilidad y tradición</h3>
                  <p className="text-center">
                    Vive una experiencia inolvidable: gastronomía, visitas,
                    picnics, paseos y rutas sostenibles <br />
                    <br /> ¡Te esperamos!
                  </p>
                </div>
                <div className="div-2">
                  <img src="/assets/images/home/section-2.png" alt="" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-3">
        <Container xxl="true">
          <Row>
            <Col>
              <div className="flexDiv">
                <div className="div-1">
                  <h3 className="text-center">
                    ¿Cuál es tu destino <br /> soñado para una <br /> escapada?
                  </h3>
                </div>
                <div className="div-2 text-center">
                  <p>
                    Te ofrecemos una inmersión en la <br /> vida rural con los
                    tuyos en contacto <br /> directo con la naturaleza
                  </p>
                  <Button className="button">Escoge tu experiencia</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-4"></section>

      <section className="section-5">
        <Container fluid>
          <Row>
            <Col className="gx-0">
              <div className="div-1">
                <div className="overlay">
                  <div className="text-overlay">
                    Alojamiento Rural <br /> Próximamente...
                  </div>
                </div>
                <div className="image-row">
                  <img
                    src="/assets/images/home/alojamiento-1.png"
                    alt="Alojamiento 1"
                  />
                  <img
                    src="/assets/images/home/alojamiento-2.png"
                    alt="Alojamiento 2"
                  />
                  <img
                    src="/assets/images/home/alojamiento-3.png"
                    alt="Alojamiento 3"
                  />
                  <img
                    src="/assets/images/home/alojamiento-4.png"
                    alt="Alojamiento 4"
                  />
                  <img
                    src="/assets/images/home/alojamiento-5.png"
                    alt="Alojamiento 5"
                  />
                </div>
                <img
                  className="image-6"
                  src="/assets/images/home/alojamiento-6.png"
                  alt="Alojamiento 6"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
