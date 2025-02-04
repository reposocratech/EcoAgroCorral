import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    post_title: "",
    post_description: "",
    mainImage: null,
    secondaryImages: [],
    files: [],
    post_is_example: false, // Nuevo campo para marcar si es un ejemplo
    post_experience_id: "", // ID de la experiencia seleccionada
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [secondaryImagePreviews, setSecondaryImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Obtener categorías
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/post/categories`
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Obtener experiencias
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/experience/getAllExperiences`
        );
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchCategories();
    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = new FormData();
    data.append("post_category_id", formData.post_category_id);
    data.append("post_description", formData.post_description);
    data.append("post_title", formData.post_title);
    data.append("post_is_example", formData.post_is_example ? 1 : 0);
    data.append("post_experience_id", formData.post_experience_id || "");

    if (formData.mainImage) {
      data.append("file", formData.mainImage);
    }
    formData.secondaryImages.forEach((file) => {
      data.append("file", file);
    });

    try {
      console.log("Creating post...");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/post/createPost`,
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Post created successfully:", result);
        navigate('/blog')
      } else {
        const errorResult = await response.json();
        console.error("Error creating post:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      fluid="xxl"
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <div className="shadow p-4 form-new">
        <h3 className="mb-3 text-center">Crear un nuevo Post</h3>
        <div className="divisor mb-3"></div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título del Post</Form.Label>
            <Form.Control
              type="text"
              name="post_title"
              value={formData.post_title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className="textarea"
              as="textarea"
              name="post_description"
              value={formData.post_description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Label>Categoría del Post</Form.Label>
          <Form.Control
            as="select"
            name="post_category_id"
            value={formData.post_category_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
            
          </Form.Control>

          <Form.Group className="mb-3 mt-3">
            <Form.Check
              type="checkbox"
              label="¿Marcar como ejemplo de experiencia?"
              name="post_is_example"
              checked={formData.post_is_example}
              onChange={handleChange}
            />
          </Form.Group>

          {formData.post_is_example && (
            <Form.Group className="mb-3">
              <Form.Label>Seleccionar Experiencia</Form.Label>
              <Form.Control
                as="select"
                name="post_experience_id"
                value={formData.post_experience_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  -- Selecciona una experiencia --
                </option>
                {experiences.map((experience) => (
                  <option
                    key={experience.experience_id}
                    value={experience.experience_id}
                  >
                    {experience.experience_title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}

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

          <div className="d-flex align-items-center justify-content-center mt-4">
            <Button type="submit" className="button text-center" >
              Crear Post
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};
