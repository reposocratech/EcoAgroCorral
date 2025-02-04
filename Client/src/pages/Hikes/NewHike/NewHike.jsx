import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "./NewHike.css";

export const CreateHike = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hike_title: "",
    hike_description: "",
    hike_distance: "",
    hike_duration: "",
    hike_itinerary: "",
    mainImage: null,
    secondaryImages: [],
  });
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [secondaryImagePreviews, setSecondaryImagePreviews] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [unassignedExperiences, setUnassignedExperiences] = useState([]);
  const [assignedExperiences, setAssignedExperiences] = useState([]);
  const [selectedExperienceToAdd, setSelectedExperienceToAdd] = useState(null);
  const [selectedExperienceToRemove, setSelectedExperienceToRemove] =
    useState(null);
  // Cargar las experiencias desde la API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/experience/getAllExperiences`
        );
        const data = await response.json();
        setExperiences(data);
        setUnassignedExperiences(data); // Inicialmente todas las experiencias están no asignadas
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      mainImage: file,
    });
    setMainImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSecondaryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      secondaryImages: files,
    });
    setSecondaryImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleAddExperience = (experience) => {
    setUnassignedExperiences((prev) =>
      prev.filter((exp) => exp.experience_id !== experience.experience_id)
    );
    setAssignedExperiences((prev) => [...prev, experience]);
  };

  const handleRemoveExperience = (experience) => {
    setAssignedExperiences((prev) =>
      prev.filter((exp) => exp.experience_id !== experience.experience_id)
    );
    setUnassignedExperiences((prev) => [...prev, experience]);
  };
  
  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();

    const data = new FormData();
    data.append("hike_title", formData.hike_title);
    data.append("hike_description", formData.hike_description);
    data.append("hike_distance", formData.hike_distance);
    data.append("hike_duration", formData.hike_duration);
    data.append("hike_itinerary", formData.hike_itinerary);

    if (formData.mainImage) {
      data.append("file", formData.mainImage);
    }

    formData.secondaryImages.forEach((file) => {
      data.append("file", file);
    });

    // Añadir experiencias asignadas al FormData
    assignedExperiences.forEach((experience) => {
      data.append("experiences[]", experience.experience_id);
    });

    try {
      // Paso 1: Crear el paseo
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/hike/createHike`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      const hikeId = result.hikeId; // Asumiendo que el resultado tiene un `hikeId`

      // Paso 2: Asignar las experiencias al paseo recién creado
      const experienceIds = assignedExperiences.map(
        (experience) => experience.experience_id
      );

      const assignExperiencesResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/hike/${hikeId}/experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ experienceIds }),
        }
      );

      if (!assignExperiencesResponse.ok) {
        throw new Error("Error assigning experiences to hike");
      }

      const assignResult = await assignExperiencesResponse.json();
      console.log("Experiences assigned successfully:", assignResult);

      // Redirigir al detalle del paseo
      
      navigate(`/paseo/unPaseo/${hikeId}`);
    } catch (error) {
      console.error("Error creando el paseo:", error);
    }
  };

  return (
    <Container
      fluid="xxl"
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <div className="shadow p-4 form-new">
        <h3 className="mb-3 text-center">Crear un nuevo Paseo</h3>
        <div className="divisor mb-3"></div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título del Paseo</Form.Label>
            <Form.Control
              type="text"
              name="hike_title"
              value={formData.hike_title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className="textarea"
              as="textarea"
              name="hike_description"
              value={formData.hike_description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Distancia (km)</Form.Label>
            <Form.Control
              type="number"
              name="hike_distance"
              value={formData.hike_distance}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duración (horas)</Form.Label>
            <Form.Control
              type="number"
              name="hike_duration"
              value={formData.hike_duration}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Itinerario</Form.Label>
            <Form.Control
              className="textarea"
              as="textarea"
              name="hike_itinerary"
              value={formData.hike_itinerary}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen Principal</Form.Label>
            <Form.Control
              type="file"
              name="mainImage"
              onChange={handleMainImageChange}
              required
            />
            {mainImagePreview && (
              <div className="mt-3 text-center">
                <Image
                  src={mainImagePreview}
                  alt="Vista previa de la imagen principal"
                  rounded
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imágenes Secundarias</Form.Label>
            <Form.Control
              type="file"
              name="secondaryImages"
              multiple
              onChange={handleSecondaryImagesChange}
            />
            {secondaryImagePreviews.length > 0 && (
              <Row className="mt-3">
                {secondaryImagePreviews.map((src, index) => (
                  <Col xs={6} md={4} lg={3} className="mb-3" key={index}>
                    <Image
                      src={src}
                      alt={`Vista previa ${index + 1}`}
                      rounded
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Form.Group>

          {/* Selector de Experiencias */}
          <Form.Group className="mb-3 d-flex flex-wrap gap-3 justify-content-around">
            {/* Experiencias no asignadas */}
            <div className="d-flex flex-column justify-content-around align-items-center">
              <Form.Label>Experiencias No Asignadas</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                multiple
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedExperienceToAdd(selectedId);
                }}
              >
                {unassignedExperiences.length > 0 ? (
                  unassignedExperiences.map((experience) => (
                    <option
                      key={experience.experience_id}
                      value={experience.experience_id}
                    >
                      {experience.experience_title}
                    </option>
                  ))
                ) : (
                  <option disabled>No hay experiencias</option>
                )}
              </Form.Control>
              <Button
                className="mt-2 button-primary"
                onClick={() => {
                  const experience = unassignedExperiences.find(
                    (exp) =>
                      exp.experience_id === parseInt(selectedExperienceToAdd)
                  );
                  if (experience) {
                    handleAddExperience(experience);
                    setSelectedExperienceToAdd(null); // Reset after adding
                  }
                }}
                disabled={!selectedExperienceToAdd}
              >
                Añadir
              </Button>
            </div>

            {/* Experiencias asignadas */}
            <div className="d-flex flex-column justify-content-around align-items-center">
              <Form.Label>Experiencias Asignadas</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                multiple
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedExperienceToRemove(selectedId);
                }}
              >
                {assignedExperiences.length > 0 ? (
                  assignedExperiences.map((experience) => (
                    <option
                      key={experience.experience_id}
                      value={experience.experience_id}
                    >
                      {experience.experience_title}
                    </option>
                  ))
                ) : (
                  <option disabled>No hay experiencias asignadas</option>
                )}
              </Form.Control>
              <Button
                className="mt-2 delete"
                onClick={() => {
                  const experience = assignedExperiences.find(
                    (exp) =>
                      exp.experience_id === parseInt(selectedExperienceToRemove)
                  );
                  if (experience) {
                    handleRemoveExperience(experience);
                    setSelectedExperienceToRemove(null); // Reset after removing
                  }
                }}
                disabled={!selectedExperienceToRemove}
              >
                Quitar
              </Button>
            </div>
          </Form.Group>

          <div className="d-flex align-items-center justify-content-center mt-4">
            <Button type="submit" className="button text-center">
              Crear Paseo
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};
