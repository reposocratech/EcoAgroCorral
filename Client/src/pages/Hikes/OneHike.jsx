import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const OneHike = () => {
  const { id } = useParams();
  const [hike, setHike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchHikeData = async () => {
          try {
              const response = await fetch(`/api/hikes/findHike/${id}`);
              if (!response.ok) {
                  throw new Error('Error al obtener los datos del paseo');
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hike) return <p>No se encontró el paseo.</p>;

  return (
      <div>
          <h1>{hike.name}</h1>
          <p><strong>Descripción:</strong> {hike.description}</p>
          <p><strong>Ubicación:</strong> {hike.location}</p>
          <h3>Imágenes del Paseo</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
              {hike.images.map((img, index) => (
                  <img key={index} src={img.image_url} alt={`Hike ${index + 1}`} style={{ width: '200px' }} />
              ))}
          </div>
      </div>
  );
}
