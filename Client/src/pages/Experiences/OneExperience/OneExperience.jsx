import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../../helpers/axiosHelper";
import { Alert, Button, Col, Container, Row, Modal } from "react-bootstrap";
import { HikeCard } from "../../../components/HikeCard/HikeCard";
import { FeatureCardJustifyLeft } from "../../../components/FeatureCardJustifyLeft/FeatureCardJustifyLeft.jsx";
import { FeatureCardJustifyRight } from "../../../components/FeatureCardJustifyRight/FeatureCardJustifyRight.jsx";
import { ExperiencePicGallery } from "../../../components/ExperiencePicGallery/ExperiencePicGallery.jsx";
import { AgroContext } from "../../../context/ContextProvider.jsx";
import "./oneExperience.css";

export const OneExperience = () => {
  const { user } = useContext(AgroContext);
  const [experienceInfo, setExperienceInfo] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getExperience = async () => {
      try {
        const res = await fetchData(
          `api/experience/getOneExperience/${id}`,
          "get"
        );
        setExperienceInfo(res);
      } catch (error) {
        console.error(error);
        setError("Error al cargar la experiencia.");
      }
    };

    getExperience();
  }, [id]);

  const handleDisable = async () => {
    try {
      const response = await fetchData(
        `api/experience/disableExperience/${id}`,
        "put"
      );
      console.log("Experiencia deshabilitada:", response);
      navigate("/admin/experiencias");
    } catch (error) {
      console.error("Error al deshabilitar la experiencia:", error);
      setError("Error al intentar deshabilitar la experiencia.");
    }
  };

  return (
    <>
      <section className="pt-5">
        <Container fluid="xxl">
          <div className="text-center px-5 text-experience">
            <h1>{experienceInfo?.experience?.experience_title}</h1>
            <p>{experienceInfo?.experience?.experience_description}</p>
          </div>
        </Container>
      </section>
      <section className="my-4 pt-4 hikeAvailable">
        <Container fluid="xxl">
          <div className="d-flex gap-3">
            <h2 className="text-experience">Paseos disponibles:</h2>
          </div>

          <Row>
            <div className="d-flex flex-wrap justify-content-center align-content-center">
              {experienceInfo?.hikes?.map((elem) => (
                <Col
                  key={elem.hike_id}
                  xs={12}
                  md={6}
                  xl={4}
                  className="card-cols mt-3"
                >
                  <HikeCard hike={elem} />
                </Col>
              ))}
            </div>
          </Row>
          <div className="centered-container">
            {user?.user_type === 1 && (
              <button
                className="addexp-btn"
                onClick={() => navigate("/paseo/NuevoPaseo")}
              >
                Añadir Paseo
              </button>
            )}
          </div>
        </Container>
      </section>
      <section className="text-experience">
        <Container fluid="xxl">
          {experienceInfo?.features?.map((elem, index) => (
            (index + 1) % 2 === 1 ? (
              <Row
                key={elem.feature_id}
                className="d-flex justify-content-start"
              >
                <Col key={elem.feature_id} xs={12} xl={6}>
                  <FeatureCardJustifyLeft feature={elem} />
                </Col>
              </Row>
            ) : (
              <Row key={elem.feature_id} className="d-flex justify-content-end">
                <Col key={elem.feature_id} xs={12} xl={6}>
                  <FeatureCardJustifyRight feature={elem} />
                </Col>
              </Row>
            )
          ))}
          {user?.user_type === 1 && (
            <div className="mt-5 d-flex justify-content-center flex-wrap gap-3">
              <Button
                className="button-modificar-paseo"
                onClick={() => navigate(`/experiencias/editExperience/${id}`)}
              >
                Modificar experiencia
              </Button>

              <Button className="button-eliminar-paseo" onClick={handleDisable}>
                Deshabilitar experiencia
              </Button>
            </div>
          )}
        </Container>
      </section>
      <section className="mt-5 gray-bg">
        <Container fluid="xxl">
          <Row>
            <div className="d-flex justify-content-center flex-wrap">
              <ExperiencePicGallery
                pictures={experienceInfo?.experiencePictures}
              />
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};