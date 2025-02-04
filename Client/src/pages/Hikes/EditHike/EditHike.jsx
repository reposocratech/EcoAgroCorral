import { useEffect, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  Image,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import "./EditHike.css";
import {HikeExperiences} from "../../../components/AsingExperienceToHike/EditHikeExperience";
("../../../components/AsingExperienceToHike/EditHikeExperience");

export const EditHike = () => {
  const { hikeId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hike_title: "",
    hike_description: "",
    hike_distance: "",
    hike_duration: "",
    hike_itinerary: "",
    mainImage: null,
    secondaryImages: [],
    imageUrls: [],
    removedImages: [],
  });

  const [images, setImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [mainImageMissing, setMainImageMissing] = useState(false); // Alerta de imagen principal
  const [formIncomplete, setFormIncomplete] = useState(false); // Alerta de campos incompletos

  // Fetch hike details including images
  const fetchHikeDetails = async () => {
    try {
      const response = await fetchData(`api/hike/findHike/${hikeId}`, "get");
      setFormData({
        hike_title: response.hike_title,
        hike_description: response.hike_description,
        hike_distance: response.hike_distance,
        hike_duration: response.hike_duration,
        hike_itinerary: response.hike_itinerary,
        mainImage: response.images.find((img) => img.is_main) || null,
        secondaryImages: response.images.slice(1),
        imageUrls: response.images
          .slice(1)
          .map(
            (img) =>
              `${import.meta.env.VITE_SERVER_URL}images/hikes/${
                img.hike_pictures_file
              }`
          ),
        removedImages: [],
      });
      setImages(response.images);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchHikeDetails();
  }, [hikeId]);

  // Handle file input for main image (set as main when selected)
  const handleMainImageSelect = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      console.error("No se ha seleccionado un archivo.");
      return;
    }

    const newFormData = new FormData();
    newFormData.append("file", selectedFile);
    newFormData.append("is_main", 1); // Marcar la imagen como principal

    try {
      const response = await fetch(
        `http://localhost:4000/api/hike/addHikeMainImage/${hikeId}`,
        {
          method: "POST",
          body: newFormData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta del servidor:", errorText);
        throw new Error("Error al agregar la imagen principal");
      }

      fetchHikeDetails(); // Recargar las imágenes después de subir la nueva
    } catch (error) {
      console.error("Error cargando la imagen principal:", error);
      setShowAlert(true);
    }
  };

  // Handle file input for secondary images
  const handleSecondaryImageUpload = async (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length === 0) {
      console.error("No se ha seleccionado un archivo.");
      return;
    }

    const newFormData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      newFormData.append("file", file);
      newFormData.append("is_main", 0); // Marcar las imágenes como secundarias
    });

    try {
      const response = await fetch(
        `http://localhost:4000/api/hike/addHikeImages/${hikeId}`,
        {
          method: "POST",
          body: newFormData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta del servidor:", errorText);
        throw new Error("Error al agregar las imágenes secundarias");
      }

      fetchHikeDetails(); // Recargar las imágenes después de subir la nueva
    } catch (error) {
      console.error("Error cargando las imágenes secundarias:", error);
      setShowAlert(true);
    }
  };

  // Handle image deletion
  const deleteImage = async (image_id) => {
    try {
      await fetchData(`api/hike/deleteHikeImage/${image_id}`, "delete");

      // Update state to remove deleted image
      setImages(images.filter((img) => img.hike_pictures_id !== image_id));

      // Optionally remove the image URL from the form data for submission
      setFormData((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls.filter((url) => !url.includes(image_id)),
      }));

      console.log(`Image with id ${image_id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting image:", error);
      setShowAlert(true);
    }
    fetchHikeDetails();
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si todos los campos están completos
    const requiredFields = [
      "hike_title",
      "hike_description",
      "hike_distance",
      "hike_duration",
      "hike_itinerary",
    ];

    // Comprobar si algún campo obligatorio está vacío
    const isFormIncomplete = requiredFields.some(
      (field) => !formData[field] || formData[field] === ""
    );

    if (isFormIncomplete) {
      setFormIncomplete(true); // Mostrar alerta si hay campos vacíos
      return;
    }

    setFormIncomplete(false); // Ocultar alerta si todos los campos están completos

    // Verificar si falta la imagen principal
    if (!formData.mainImage) {
      setMainImageMissing(true); // Mostrar alerta si falta la imagen principal
      return;
    }

    setMainImageMissing(false); // Ocultar alerta si hay imagen principal

    const url = `http://localhost:4000/api/hike/hikeUpdate/${hikeId}`;
    const data = new FormData();

    // Agregar datos del formulario al FormData
    for (const key in formData) {
      if (
        key !== "mainImage" &&
        key !== "secondaryImages" &&
        key !== "removedImages"
      ) {
        data.append(key, formData[key]);
      }
    }

    // Enviar la solicitud
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el paseo: ${response.status}`);
      }

      // Si la respuesta es exitosa, redirige o actualiza el estado
      console.log("Paseo actualizado correctamente");
      navigate(`/paseo/unPaseo/${hikeId}`);
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      setShowAlert(true);
    }
  };

  return (
    <Container fluid="xxl">
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Hubo un problema al cargar las imágenes. Por favor, intenta
          nuevamente.
        </Alert>
      )}
      {mainImageMissing && (
        <Alert
          variant="warning"
          onClose={() => setMainImageMissing(false)}
          dismissible
        >
          Debes seleccionar una imagen principal.
        </Alert>
      )}
      {formIncomplete && (
        <Alert
          variant="warning"
          onClose={() => setFormIncomplete(false)}
          dismissible
        >
          Todos los campos del formulario son obligatorios. Por favor, rellena
          todos los campos.
        </Alert>
      )}
      <div className="d-flex flex-column align-items-center">
        <Form className="form-edit-hike" onSubmit={handleSubmit}>
          <h3 className="text-center">Modificar Paseo</h3>
          <div className="divisor mb-3 mt-3"></div>
          <Row className="mb-3">
            {/* Título */}
            <Form.Group as={Col}>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="hike_title"
                value={formData.hike_title}
                onChange={(e) =>
                  setFormData({ ...formData, hike_title: e.target.value })
                }
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* Descripción */}
            <Form.Group as={Col}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="hike_description"
                value={formData.hike_description}
                onChange={(e) =>
                  setFormData({ ...formData, hike_description: e.target.value })
                }
                className="textarea"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* Distancia */}
            <Form.Group as={Col}>
              <Form.Label>Distancia</Form.Label>
              <Form.Control
                type="number"
                name="hike_distance"
                value={formData.hike_distance}
                onChange={(e) =>
                  setFormData({ ...formData, hike_distance: e.target.value })
                }
                required
                min="0"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* Duración */}
            <Form.Group as={Col}>
              <Form.Label>Duración</Form.Label>
              <Form.Control
                type="number"
                name="hike_duration"
                value={formData.hike_duration}
                onChange={(e) =>
                  setFormData({ ...formData, hike_duration: e.target.value })
                }
                required
                min="0"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* Itinerario */}
            <Form.Group as={Col}>
              <Form.Label>Itinerario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="hike_itinerary"
                value={formData.hike_itinerary}
                onChange={(e) =>
                  setFormData({ ...formData, hike_itinerary: e.target.value })
                }
                className="textarea"
                required
              />
            </Form.Group>
          </Row>
          {/* Imagen Principal */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Imagen Principal</Form.Label>
              {!formData.mainImage && (
                <Form.Control type="file" onChange={handleMainImageSelect} />
              )}
              {formData.mainImage && (
                <div className="d-flex flex-column align-items-center">
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}images/hikes/${
                      formData.mainImage.hike_pictures_file
                    }`}
                    alt="Main"
                    fluid
                    rounded
                    className="mainImage"
                  />
                  <Button
                    variant="danger"
                    onClick={() =>
                      deleteImage(formData.mainImage.hike_pictures_id)
                    }
                    className="delete mt-2"
                  >
                    Eliminar Imagen Principal
                  </Button>
                </div>
              )}
            </Form.Group>
          </Row>
          {/* Imágenes Secundarias */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Imágenes Secundarias</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleSecondaryImageUpload}
              />
            </Form.Group>
          </Row>
          {/* Mostrar imágenes secundarias */}
          <div className="d-flex  flex-wrap justify-content-around align-items-center gap-2">
            {images.map(
              (elem) =>
                elem.is_main === 0 && (
                  <div className="cont-pic" key={elem.hike_pictures_id}>
                    <div className="secondary-image d-flex flex-column align-items-center gap-2">
                      <Image
                        className="hike-img"
                        src={`${import.meta.env.VITE_SERVER_URL}/images/hikes/${
                          elem.hike_pictures_file
                        }`}
                        alt="Secondary"
                        style={{ width: "100px" }}
                        rounded
                      />
                      <Button
                        
                        className="delete"
                        onClick={() => deleteImage(elem.hike_pictures_id)}
                      >
                        Borrar
                      </Button>
                      <br />
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            <HikeExperiences hikeId={hikeId} />
          </div>
          {/* Botón de envío */}
          <div className="d-flex justify-content-center">
            <Button className="button mt-4" type="submit">
              Actualizar Paseo
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};
