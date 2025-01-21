import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./VerifyEmail.css";
import { Col, Container, Row } from "react-bootstrap";

export const VerifyEmail = () => {
  const [verEmail, setVerEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const res = await fetchData(`api/user/verificar/${token}`, "get");
        setMessage(res.msg);
        setVerEmail(true);
      } catch (error) {
        setMessage(
          error.response?.data?.msg ||
            "Error al verificar el correo electrónico"
        );
        setVerEmail(false);
      }
    };
    confirmEmail();
  }, [token]);

  const handleResend = async () => {
    try {
      const res = await fetchData("api/user/resendVerification", "post", {
        user_email: email,
      });
      setMessage(res.msg);
    } catch (error) {
      setMessage(
        error.response?.data?.msg ||
          "Error al reenviar el correo de verificación"
      );
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {verEmail === true && (
        <>
          <section className="mt-5">
            <Container fluid="xxl">
              <Row className="justify-content-center p-2">
                <Col
                  lg={4}
                  md={6}
                  className="d-flex flex-column shadow my-5 verify"
                ><p className="text-center mt-4">{message}</p>
                  <div className="separator mt-2 mb-2 ms-auto"></div>
                  <div>
                    <button
                      onClick={()=>navigate('/user/login')}
                      className="btn mb-5 mt-3"
                    >
                      Inicia sesión
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
      {verEmail === false && (
        <>
          <section className="mt-5">
            <Container fluid="xxl">
              <Row className="justify-content-center p-2">
                <Col
                  lg={4}
                  md={6}
                  className="d-flex flex-column shadow my-5 verify"
                >
                  <span className="text-center mt-4">{message}</span>
                  <div className="separator mt-2 mb-2 ms-auto"></div>
                  <input
                    type="email"
                    placeholder="Introduce tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 mb-2 text-center rounded-2"
                  />
                  <div>
                    <button
                      onClick={handleResend}
                      className="btn mb-5 mt-3"
                    >
                      Reenviar Verificación
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
    </div>
  );
};
