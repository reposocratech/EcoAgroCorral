import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./AdminExperience.css";

export const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchExperiences(currentPage);
  }, [currentPage]);

  const fetchExperiences = async (page) => {
    try {
      const response = await fetchData(
        `api/admin/getAllExperiences?page=${page}&limit=15`,
        "get"
      );
      setExperiences(response.experiences);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error al cargar experiencias:", error);
    }
  };

  const handleToggleExperience = async (experience_id, isDeleted) => {
    try {
      const endpoint = isDeleted ? "enableExperience" : "disableExperience";
      await fetchData(`api/admin/${endpoint}`, "put", {
        id: experience_id,
      });
      fetchExperiences(currentPage);
    } catch (error) {
      console.error("Error al actualizar el estado de la experiencia:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="AdminExperiencias">
      <Container fluid="xxl">
        <h2 className="pt-4 text-center mb-4">Gestión de Experiencias</h2>
        <div className="table-responsive">
          <Table bordered hover className="mb-5 tablaAncho">
            <thead>
              <tr className="text-center">
                <th className="headTable">TÍTULO</th>
                <th className="headTable">DESCRIPCIÓN</th>
                <th className="headTable">ESTADO</th>
                <th className="headTable">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <tr
                  key={experience.experience_id}
                  className="text-center align-middle"
                >
                  <td>{experience.experience_title}</td>
                  <td>{experience.experience_description}</td>
                  <td>
                    {experience.experience_is_deleted
                      ? "Deshabilitado"
                      : "Habilitado"}
                  </td>
                  <td>
                    <Button
                      variant={
                        experience.experience_is_deleted ? "success" : "danger"
                      }
                      onClick={() =>
                        handleToggleExperience(
                          experience.experience_id,
                          experience.experience_is_deleted
                        )
                      }
                    >
                      {experience.experience_is_deleted
                        ? "Habilitar"
                        : "Deshabilitar"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mb-5 gap-4 d-flex justify-content-center align-items-center">
            {totalPages > 1 && (
              <>
                <Button
                  className="btnPage"
                  variant="outline-secondary"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  Anterior
                </Button>
                <span className="text-black">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  className="btnPage"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Siguiente
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};