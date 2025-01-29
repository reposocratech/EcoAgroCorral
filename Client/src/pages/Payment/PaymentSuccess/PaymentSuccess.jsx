import { useEffect } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';

export const PaymentSuccess = () => {

  useEffect(() => {
    const reservationToDb = async () => {
      try {
        const dataLocal = JSON.parse(localStorage.getItem("reservationData"));
        await fetchData(
          "api/user/createReservation",
          "post",
          dataLocal
        );
      } catch (error) {
        console.log(error);
      }
    }

    reservationToDb();
    localStorage.removeItem("reservationData");
  }, [])
  

  
  return (
    <div>
      <h1>Pago realizado correctamente</h1>
      <p>Pronto recibirás un email de confirmación</p>
    </div>
  )
}
