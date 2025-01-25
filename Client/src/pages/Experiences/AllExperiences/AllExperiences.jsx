import { useContext, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import { ExperiencePresentationCard } from "../../../components/ExperiencePresentationCard/ExperiencePresentationCard.jsx";
import { useNavigate } from "react-router-dom";
import { AgroContext } from "../../../context/ContextProvider.jsx";

export const AllExperiences = () => {
  const { user } = useContext(AgroContext);
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const res = await fetchData("api/experience/getAllExperiences", "get");
        setExperiences(res);
      } catch (error) {
        console.log(error);
      }
    };

    getExperiences();
  }, []);

  return (
    <>
      <section>
        <Container fluid="xxl" className="pb-5">
          {experiences.map((elem, index) => {
            return (
              <Row key={elem.experience_id} className="mt-3">
                <ExperiencePresentationCard experience={elem} index={index} />
              </Row>
            );
          })}
          {user?.user_type === 1 && (
            <div className="mt-5 d-flex justify-content-center flex-wrap gap-3">
              <Button
                className="button-nuevo-paseo"
                onClick={() => navigate("/experiencias/createExperience")}
              >
                Crear una nueva experiencia
              </Button>

              <Button
                className="button-eliminar-paseo2"
                onClick={() => navigate("/admin/experiencias")}
              >
                Ver experiencias
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
