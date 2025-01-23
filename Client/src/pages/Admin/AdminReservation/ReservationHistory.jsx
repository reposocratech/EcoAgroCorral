import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./ReservationHistory.css";

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReservations(currentPage);
  }, [currentPage]);

  const fetchReservations = async (page) => {
    try {
      const response = await fetchData(
        `api/admin/getAllReservations?page=${page}&limit=15&pastOnly=true`,
        "get"
      );
      setReservations(response.reservations);
      setTotalPages(response.totalPages); 

    } catch (error) {
      console.error("Error al cargar el historial de reservas:", error);
    }
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
    <section className="ReservationHistory">
      <Container fluid>
        <h2 className="pt-5 text-center mb-3">Historial de Reservas</h2>
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
      </Container>
    </section>
  );
};
