import  { useEffect, useState } from "react";
import { Table, Button, Alert,Container } from "react-bootstrap";
import './DeletedHikes.css';
export const DeletedHikes = () => {
  const [hikes, setHikes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los hikes borrados
    const fetchDeletedHikes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/hike/findAllDelHikes`);
        if (!response.ok) {
          throw new Error("No se pudieron obtener los hikes borrados");
        }
        const data = await response.json();
        setHikes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeletedHikes();
  }, []);

  // Función para recuperar un hike
  const recoverHike = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/hike/hikeRes/${id}`, {
        method: "put",
      });
      if (!response.ok) {
        throw new Error("Error al recuperar el hike");
      }
      const updatedHike = await response.json();
      setHikes(hikes.filter((hike) => hike.hike_id !== id)); // Eliminar el hike recuperado de la lista
      
    } catch (error) {
      console.log("Error al recuperar el hike:", error);
      
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <Container fluid="xxl">
      <div className="d-flex flex-column mt-5 align-items-center">
        <div className="my-4">
          <h2>Paseos Borrados</h2>
          {hikes.length === 0 ? (
            <p>No hay paseos borrados.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {hikes.map((hike) => (
                  <tr key={hike.hike_id}>
                    <td>{hike.hike_title}</td>
                    <td>{hike.hike_description}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => recoverHike(hike.hike_id)}
                        className="button-nuevo-paseo"
                      >
                        Recuperar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </Container >
  );
};


