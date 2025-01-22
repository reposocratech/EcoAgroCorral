import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./ReservationHistory.css"

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetchData("api/admin/getAllReservations", "get");
        const historyReservations = response.filter(
          (reservation) =>
            reservation.reservation_date <
            new Date(Date.now()).toISOString().split("T")[0]
        );
        setReservations(historyReservations);
      } catch (error) {
        console.error("Error al cargar el historial de reservas:", error);
      }
    };
    fetchReservations();
  }, []);

  return (
    <section className="ReservationHistory">
      <Container>
        <h2 className="pt-5 text-center mb-3">Historial de Reservas</h2>
        <Table bordered hover responsive className="mb-5">
          <thead>
            <tr className="text-center">
              <th className="headTable">Usuario</th>
              <th className="headTable">Experiencia</th>
              <th className="headTable">Ruta</th>
              <th className="headTable">Fecha</th>
              <th className="headTable">Hora</th>
              <th className="headTable">Adultos</th>
              <th className="headTable">Niños</th>
              <th className="headTable">Precio Total</th>
              <th className="headTable">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id} className="text-center">
                <td className="text-truncate" title={`${reservation.user_name} ${reservation.user_lastname}`}>
  {`${reservation.user_name} ${reservation.user_lastname}`}
</td>
                <td>{reservation.experience_title}</td>
                <td>{reservation.hike_title}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.reservation_adult}</td>
                <td>{reservation.reservation_children}</td>
                <td>{`${reservation.reservation_total_price} €`}</td>
                <td>{reservation.reservation_text || "Sin observaciones"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </section>
  );
};
