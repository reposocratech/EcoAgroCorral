import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner, Alert, Container, Image, Modal } from "react-bootstrap";
import "./OnePost.css";
import { AgroContext } from "../../../context/ContextProvider";

export const OnePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/post/deletePost/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/blog");
      } else {
        const errorResult = await response.json();
        console.error("Error deleting post:", errorResult);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setShowModal(false);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
                    maxHeight: "600px",
                    minHeight: "300px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
            )}
          <div className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
            <div className="header-text">
              <p className="text-muted">
                {post.category_name.toUpperCase()}   
              </p>
              <h2>{post.post_title}</h2>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid divisor-post"></div>
      <section className="mb-4 post-content">
        <p className="text-center">{post.post_description}</p>
        <p className="text-end fechaBlog mb-0">{new Date(post.post_date).toLocaleString()}</p>
      </section>

      <section className="mb-4">
        {post.images && post.images.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-5">
            {post.images
              .filter((image) => image.is_main === 0)
              .map((image, index) => (
                <div key={index} className="flex-item">
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}images/posts/${
                      image.post_picture_file
                    }`}
                    alt={`Post Image ${index + 1}`}
                    thumbnail
                    style={{
                      height: "300px",
                      width: "400px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
          </div>
        )}
      </section>
      <section className="text-center mt-4">
        {user?.user_type === 1 && (
          <>
            <Button
              variant="success"
              className="button-nuevo-post me-2"
              onClick={() => navigate(`/blog/editPost/${postId}`)}
            >
              Editar publicación
            </Button>
            <Button
              variant="danger"
              className="button-nuevo-post"
              onClick={handleShowModal}
            >
              Borrar publicación
            </Button>
          </>
        )}
      </section>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal">Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            ¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleDeletePost}>
            Eliminar Publicación
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};