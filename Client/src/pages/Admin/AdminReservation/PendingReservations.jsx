import { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./PendingReservations.css";

export const PendingReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetchData("api/admin/getAllReservations", "get");
        const pendingReservations = response.filter(
          (reservation) =>
            reservation.reservation_date >=
            new Date(Date.now()).toISOString().split("T")[0]
        );
        setReservations(pendingReservations);
      } catch (error) {
        console.error("Error al cargar las reservas pendientes:", error);
      }
    };
    fetchReservations();
  }, []);

  const handleCancelReservation = async () => {
    try {
      if (selectedReservation) {
        const updatedReservations = await fetchData(
          "api/admin/cancelReservation",
          "delete",
          { id: selectedReservation }
        );
        const pendingReservations = updatedReservations.filter(
          (reservation) =>
            reservation.reservation_date >=
            new Date(Date.now()).toISOString().split("T")[0]
        );
        setReservations(pendingReservations);
        setShowModal(false);
        setSelectedReservation(null);
      }
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  const handleShowModal = (reservation_id) => {
    setSelectedReservation(reservation_id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  return (
    <section className="PendingReservations">
      <Container>
        <h2 className="pt-5 text-center mb-3">Reservas Pendientes</h2>
        <Table bordered hover className="mb-5">
          <thead>
            <tr className="text-center">
              <th className="headTable">USUARIO</th>
              <th className="headTable">EXPERIENCIA</th>
              <th className="headTable">RUTA</th>
              <th className="headTable">FECHA</th>
              <th className="headTable">HORA</th>
              <th className="headTable">ADULTOS</th>
              <th className="headTable">NIÑOS</th>
              <th className="headTable">PRECIO TOTAL</th>
              <th className="headTable">OBSERVACIONES</th>
              <th className="headTable">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id} className="text-center align-middle">
                <td>{`${reservation.user_name} ${reservation.user_lastname}`}</td>
                <td>{reservation.experience_title}</td>
                <td>{reservation.hike_title}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.reservation_adult}</td>
                <td>{reservation.reservation_children}</td>
                <td>{`${reservation.reservation_total_price} €`}</td>
                <td>{reservation.reservation_text || "Sin observaciones"}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal(reservation.reservation_id)}
                  >
                    Cancelar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="tituloModal">Confirmar cancelación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">
              ¿Estás seguro de que deseas cancelar esta reserva? Esta acción es permanente y no se puede deshacer.
            </p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={handleCancelReservation}>
              Cancelar reserva
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};
