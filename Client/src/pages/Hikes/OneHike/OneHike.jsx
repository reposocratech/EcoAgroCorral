import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Row, Alert } from "react-bootstrap";
import "./OneHike.css";
import { AgroContext } from "../../../context/ContextProvider";
export const OneHike = () => {
  const { id } = useParams();
  const [hike, setHike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AgroContext);

  useEffect(() => {
    const fetchHikeData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/hike/findHike/${id}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setHike(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHikeData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}api/hike/hikeDel/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el paseo");
      }

      const result = await response.json();
      console.log("Paseo eliminado:", result);
      navigate("/paseo/borrados");
    } catch (error) {
      console.error("Error eliminando el paseo:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  if (!hike) return <p>No se encontró el paseo.</p>;

  return (
    <Container fluid="xxl" className="pb-3 pt-1">
      <div className="hike-details mt-5 mb-3">
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${
              import.meta.env.VITE_SERVER_URL
            }images/hikes/${
              hike.images.find((img) => img.is_main === 1)?.hike_pictures_file
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "50px 0",
            color: "white",
            borderRadius: "20px",
          }}
        >
          <div className="container text-center">
            <h2>{hike.hike_title}</h2>
            <p>{hike.hike_description}</p>
          </div>
        </section>

        {hike.images && hike.images.length > 0 ? (
          <Row className="d-flex mt-5 mb-5 flex-wrap justify-content-center">
            {hike.images
              .filter((img) => img.is_main === 0) // Filtrar solo las imágenes donde is_main === 0
              .map((img, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center mb-3"
                  style={{ flex: "1 1 30%" }}
                >
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}images/hikes/${
                      img.hike_pictures_file
                    }`}
                    alt={`Imagen ${index + 1}`}
                    className="img" // Asegura que la imagen sea responsiva
                  />
                </div>
              ))}
          </Row>
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}

        <section className="features">
          <div className="container text-center">
            <div className="feature-item-left">
              <div className="feature-item d-flex gap-3">
                <img
                  src={`/assets/images/hike/mochila.png`} // Cambia el src para usar el icono de la carpeta public
                  alt="Mochila"
                  className="feature-icon "
                />
                <div className="text-start">
                  <h3>Mochila</h3>
                  <p>
                    Lleva solo lo necesario y asegúrate de incluir elementos
                    esenciales como agua y alimento. Ropa y calzado cómodo.
                  </p>
                </div>
              </div>
            </div>

            <div className="feature-item-right">
              <div className="feature-item d-flex gap-3">
                <div className="text-end">
                  <h3>Respeta el Medio Ambiente</h3>
                  <p>
                    Trata de minimizar tu impacto en el entorno natural y
                    respeta las tradiciones y costumbres de la comunidad local.
                  </p>
                </div>
                <img
                  src={`/assets/images/hike/hoja.png`} // Usar la ruta correspondiente para cada icono
                  alt="Respeta el Medio Ambiente"
                  className="feature-icon"
                />
              </div>
            </div>

            <div className="feature-item-left">
              <div className="feature-item d-flex gap-3">
                <img
                  src={`/assets/images/hike/personas.png`} // Cambia aquí con el icono adecuado
                  alt="Ruta para Todas las Edades"
                  className="feature-icon"
                />
                <div className="text-start">
                  <h3>Ruta para Todas las Edades</h3>
                  <p>
                    Ruta fácil de realizar, tanto andando como en bici. Para
                    disfrutar de la naturaleza en compañía de amigos y
                    familiares.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-5 d-flex justify-content-around  flex-wrap gap-5">
          <div className="d-flex gap-3 align-items-center itinerario">
            <img
              src={`/assets/images/hike/itinerario.png`}
              className="icon-hike"
            />
            <div className="  itinerario-txt text-start">
              <h3 className="text-center">Itinerario</h3>
              <p>{hike.hike_itinerary}</p>
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center datos-div">
            <img
              src={`/assets/images/hike/datos.png`}
              className="icon-hike datos"
            />
            <div className="max-width text-start">
              <h3 className="text-center ">Datos</h3>
              <p>
                <strong>Distancia:</strong> {hike.hike_distance} km
              </p>
              <p>
                <strong>Duración:</strong> {hike.hike_duration} horas
              </p>
            </div>
          </div>
        </section>

        <div className="text-center mt-4 p-2">
          <Button
            className="button"
            onClick={() =>
              navigate(
                user && user.user_type === 0 ? "/user/reserva" : "/user/register"
              )
            }
          >
            {user && user.user_type === 0 ? "Reservar" : "Registrarse"}
          </Button>
        </div>
      </div>

      {user?.user_type === 1 && (
        <div className="mt-4 d-flex justify-content-center flex-wrap gap-1">
          <Button
            className="button-nuevo-paseo"
            onClick={() => navigate("/paseo/NuevoPaseo")}
          >
            Crear un nuevo Paseo
          </Button>

          <Button
            className="button-modificar-paseo"
            onClick={() => navigate(`/paseo/editar/${id}`)}
          >
            Modificar Paseo
          </Button>

          <Button className="button-eliminar-paseo" onClick={handleDelete}>
            Eliminar Paseo
          </Button>

          <Button
            className="button-eliminar-paseo2"
            onClick={() => navigate("/paseo/borrados")}
          >
            Ver paseos eliminados
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OneHike;
