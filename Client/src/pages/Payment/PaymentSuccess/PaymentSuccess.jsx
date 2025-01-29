import { useEffect } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FaCheckCircle } from "react-icons/fa";
import './PaymentSuccess.css';

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const reservationToDb = async () => {
      try {
        const dataLocal = JSON.parse(localStorage.getItem("reservationData"));
        await fetchData("api/user/createReservation", "post", dataLocal);
      } catch (error) {
        console.log(error);
      }
    };

    reservationToDb();
    localStorage.removeItem("reservationData");
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="bg-light shadow-lg rounded p-5 text-center boxPago">
        <FaCheckCircle className="text-success checkIcon mb-3" />
        <h1 className="fw-bold">Pago realizado correctamente</h1>
        <p className="fs-5">Pronto recibirás un email de confirmación.</p>
        <Button className="btn-success px-4 py-2 mt-3 fw-bold" onClick={() => navigate("/user/perfil")}>
          Ir a mi perfil
        </Button>
      </div>
    </Container>
  );
};
