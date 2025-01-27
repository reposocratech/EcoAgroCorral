import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner, Alert, Container, Image } from "react-bootstrap";
import "./OnePost.css";
import { AgroContext } from "../../../context/ContextProvider";
export const OnePost = () => {
  const { postId } = useParams(); // Capturar el ID del post desde la URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AgroContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/post/findPost/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to load post data");
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message); // Guardar el mensaje de error
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid="xxl" className="pt-5 pb-5 mt-5">
      <header className="text-center post-head mb-4">
        <div className="d-flex flex-column flex-md-row align-items-center gap-4">
          {/* Mostrar la imagen principal si está disponible */}
          {post.images &&
            post.images.length > 0 &&
            post.images.some((image) => image.is_main === 1) && (
              <div className="main-image-container">
                <Image
                  src={`${import.meta.env.VITE_SERVER_URL}images/posts/${
                    post.images.find((image) => image.is_main === 1)
                      .post_picture_file
                  }`}
                  alt="Main Post Image"
                  fluid
                  style={{
                    maxWidth: "600px",
                    minWidth: "300px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}
          {/* Contenedor del texto */}
          <div className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
            <div className="header-text">
              <h1>{post.post_title}</h1>
              <p className="text-muted">
                {post.category_name} |{" "}
                {new Date(post.post_date).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid divisor-post"></div>
      <section className="mb-4 post-content">
        <p className="text-center">{post.post_description}</p>
      </section>

      <section className="mb-4">
        {post.images && post.images.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-5">
            {post.images
              .filter((image) => image.is_main === 0) // Filtrar imágenes con is_main === 0
              .map((image, index) => (
                <div key={index} className="flex-item">
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}images/posts/${
                      image.post_picture_file
                    }`}
                    alt={`Post Image ${index + 1}`}
                    thumbnail
                    style={{
                      height: "200px",
                      width: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
          </div>
        )}
      </section>
      <footer className="text-center mt-4">
        {user?.user_type === 1 && (
          <>
            <Button
              variant="success"
              className="button-nuevo-post"
              onClick={() => navigate("/blog/crearPost")}
            >
              Crear nueva publicacion
            </Button>
            <Button
              variant="danger"
              className="button-nuevo-post"
              onClick={() => navigate("/blog/crearPost")}
            >
              Borrar publicacion
            </Button>
          </>
        )}
      </footer>
    </Container>
  );
};
