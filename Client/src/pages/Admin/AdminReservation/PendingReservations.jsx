import { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./PendingReservations.css";

export const PendingReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    fetchReservations(currentPage);
  }, [currentPage]);

  const fetchReservations = async (page) => {
    try {
      const response = await fetchData(
        `api/admin/getAllReservations?page=${page}&limit=15&pastOnly=false`,
        "get"
      );

      setReservations(response.reservations);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error al cargar las reservas pendientes:", error);
    }
  };

  const handleCancelReservation = async () => {
    try {
      if (selectedReservation) {
        await fetchData("api/admin/cancelReservation", "delete", {
          id: selectedReservation,
        });
        fetchReservations(currentPage);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="PendingReservations">
      <Container fluid>
        <h2 className="pt-5 text-center mb-3">Reservas Pendientes</h2>
        <div className="table-responsive">
          <Table bordered hover className="mb-5 tablaAncho">
            <thead>
              <tr className="text-center">
                <th className="headTable">USUARIO</th>
                <th className="headTable">EXPERIENCIA</th>
                <th className="headTable">RUTA</th>
                <th className="headTable">FECHA</th>
                <th className="headTable">HORA</th>
                <th className="headTable">ADULTOS</th>
                <th className="headTable">NIÑOS</th>
                <th className="headTable">PRECIO</th>
                <th className="headTable">OBSERVACIONES</th>
                <th className="headTable">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.reservation_id}
                  className="text-center align-middle"
                >
                  <td>{`${reservation.user_name} ${reservation.user_lastname}`}</td>
                  <td>{reservation.experience_title}</td>
                  <td>{reservation.hike_title}</td>
                  <td>
                    {`${reservation.reservation_date.slice(
                      8,
                      10
                    )}/${reservation.reservation_date.slice(
                      5,
                      7
                    )}/${reservation.reservation_date.slice(0, 4)}`}
                  </td>
                  <td>{`${reservation.reservation_time.slice(0, 5)}`}</td>
                  <td>{reservation.reservation_adult}</td>
                  <td>{reservation.reservation_children}</td>
                  <td>{`${reservation.reservation_total_price} €`}</td>
                  <td>{reservation.reservation_text || "Sin observaciones"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleShowModal(reservation.reservation_id)
                      }
                    >
                      Cancelar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mb-5 gap-4 d-flex justify-content-center align-items-center">
            {totalPages > 1 && (
              <>
                <Button
                  className="btnPage"
                  variant="outline-secondary"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  Anterior
                </Button>
                <span className="text-black">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  className="btnPage"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Siguiente
                </Button>
              </>
            )}
          </div>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="tituloModal">
              Confirmar cancelación
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">
              ¿Estás seguro de que deseas cancelar esta reserva? Esta acción es
              permanente y no se puede deshacer.
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
