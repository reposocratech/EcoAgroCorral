import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export const HikeExperiences = ({ hikeId }) => {
  const [allExperiences, setAllExperiences] = useState([]); // Todas las experiencias disponibles
  const [assignedExperiences, setAssignedExperiences] = useState([]); // Experiencias asignadas
  const [unassignedExperiences, setUnassignedExperiences] = useState([]); // Experiencias no asignadas

  // Cargar todas las experiencias desde la API usando fetch
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Llamar al endpoint para obtener las experiencias no asignadas para el hike
        const unassignedResponse = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }api/hike/${hikeId}/unassigned-experiences`
        );

        // Verificamos si la respuesta es exitosa (status 200)
        if (!unassignedResponse.ok) {
          throw new Error("Error fetching unassigned experiences");
        }

        const unassignedData = await unassignedResponse.json();
        if (Array.isArray(unassignedData)) {
          setUnassignedExperiences(unassignedData);
        }

        // Llamar al endpoint para obtener las experiencias asignadas para el hike
        const assignedResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/hike/${hikeId}/experiences`
        );

        if (assignedResponse.status === 404) {
          // Si no hay experiencias asignadas (404), manejamos esto como un array vacío
          setAssignedExperiences([]);
        } else if (assignedResponse.ok) {
          const assignedData = await assignedResponse.json();
          if (Array.isArray(assignedData)) {
            setAssignedExperiences(assignedData);
          }
        } else {
          throw new Error("Error fetching assigned experiences");
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    // Llamar a la función para obtener las experiencias cuando el componente se monta
    fetchExperiences();
  }, [hikeId]);

  // Asignar experiencias seleccionadas
  const handleAssignExperiences = async () => {
    const experiencesToAssign = Array.from(
      document.getElementById("unassignedExperiences").selectedOptions
    ).map((option) => option.value);

    if (experiencesToAssign.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/hike/${hikeId}/experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ experienceIds: experiencesToAssign }),
        }
      );

      if (!response.ok) {
        throw new Error("Error assigning experiences");
      }

      const result = await response.json();

      if (result.message === "Experiences assigned successfully") {
        // Después de asignar, volvemos a obtener las experiencias actualizadas
        const unassignedResponse = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }api/hike/${hikeId}/unassigned-experiences`
        );
        const unassignedData = await unassignedResponse.json();
        setUnassignedExperiences(unassignedData);

        const assignedResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/hike/${hikeId}/experiences`
        );
        const assignedData = await assignedResponse.json();
        setAssignedExperiences(assignedData);
      }
    } catch (error) {
      console.error("Error assigning experiences: ", error);
    }
  };

  // Desasignar experiencias seleccionadas
  const handleRemoveExperiences = async () => {
    const experiencesToRemove = Array.from(
      document.getElementById("assignedExperiences").selectedOptions
    ).map((option) => option.value);

    if (experiencesToRemove.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/hike/${hikeId}/experiences`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ experienceIds: experiencesToRemove }),
        }
      );

      if (!response.ok) {
        throw new Error("Error removing experiences");
      }

      const result = await response.json();

      if (result.message === "Experiences removed successfully") {
        // Después de desasignar, volvemos a obtener las experiencias actualizadas
        const unassignedResponse = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }api/hike/${hikeId}/unassigned-experiences`
        );
        const unassignedData = await unassignedResponse.json();
        setUnassignedExperiences(unassignedData);

        const assignedResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/hike/${hikeId}/experiences`
        );
        const assignedData = await assignedResponse.json();
        setAssignedExperiences(assignedData);
      }
    } catch (error) {
      console.error("Error removing experiences: ", error);
    }
  };

  return (
    <div  className="d-flex flex-wrap justify-content-center   align-items-center gap-3">
      <div className="mb-3 d-flex justify-content-between flex-wrap gap-3 align-items-center">
        {/* Lado izquierdo: experiencias no asignadas */}
        <div className="d-flex flex-column jusfy-content-center align-items-center gap-2">
          <Form.Label>Experiencias por asignar</Form.Label>
          <Form.Control
            as="select"
            id="unassignedExperiences"
            multiple
           
            className="assigned-exp"
          >
            {unassignedExperiences.length > 0 ? (
              unassignedExperiences.map((exp) => (
                <option key={exp.experience_id} value={exp.experience_id}>
                  {exp.experience_title}
                </option>
              ))
            ) : (
              <option disabled>No hay Experiencias</option>
            )}
          </Form.Control>
          <Button
            onClick={handleAssignExperiences}
            className="mx-2 button-primary"
            
          >
            Añadir
          </Button>
        </div>

        {/* Lado derecho: experiencias asignadas */}
        <div className="d-flex flex-column jusfy-content-center align-items-center gap-2">
          <Form.Label>Experiencias asignadas</Form.Label>
          <Form.Control 
            as="select" 
            id="assignedExperiences" 
            multiple
           
            className="assigned-exp"
            >
            {assignedExperiences.length > 0 ? (
              assignedExperiences.map((exp) => (
                <option key={exp.experience_id} value={exp.experience_id}>
                  {exp.experience_title}
                </option>
              ))
            ) : (
              <option disabled>No hay Experiencias</option>
            )}
          </Form.Control>
          <Button
            onClick={handleRemoveExperiences}
            className="mx-2 delete"
            
          >
            Quitar
          </Button>
        </div>
      </div>

      {/* Botones debajo de los selectores */}
      {/*  <Row className="d-flex justify-content-center mt-3">
        <Col className="d-flex justify-content-center">
          <Button onClick={handleAssignExperiences} className="mx-2" variant="primary">
            Assign Selected
          </Button>
          <Button onClick={handleRemoveExperiences} className="mx-2" variant="danger">
            Remove Selected
          </Button>
        </Col>
      </Row> */}
    </div>
  );
};
