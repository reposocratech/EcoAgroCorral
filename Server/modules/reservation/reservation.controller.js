import ReservationDal from "./reservation.dal.js";
import { sendMail } from "../../utils/nodemailer.js";

class ReservationController {
  getDates = async (req, res) => {
    try {
      const result = await ReservationDal.getDates();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las fechas" });
    }
  };

  getOneReservation = async (req, res) => {
    const { reservation_id } = req.params;
    console.log(reservation_id);
    try {
      const result = await ReservationDal.getOneReservation(reservation_id);
      res.status(200).json(result[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener la reserva" });
    }
  };

  

  modifyReservation = async (req, res) => {
    const { newDate, user, reservation } = req.body;

    try {
      const result = await ReservationDal.modifyReservation(
        newDate,
        reservation.reservation_id
      );
      sendMail(
        user.user_email,
        "Reserva Modificada",
        `Hola ${user.user_name}, tu reserva "${
          reservation.hike_title
        }" prevista para el día ${reservation.reservation_date.slice(
          8,
          11
        )}/${reservation.reservation_date.slice(
          5,
          7
        )} ha sido modificada correctamente. Tu nueva fecha de reserva es el ${newDate.slice(
          8,
          11
        )}/${newDate.slice(
          5,
          7
        )}. Si tienes otra consulta con lo que podamos ayudarte no dudes en contactarnos. Muchas gracias por elegirnos.`
      );
      res.status(200).json({ message: "Reserva modificada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al modificar la reserva" });
    }
  };

  setDays = async (req, res) => {
    const values = req.body;
    try {
      const result = await ReservationDal.setDays(values);
      res.status(200).json({ message: "Dias modificados correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en el controlador al cambiar los dias" });
    }
  };

  getDays = async (req, res) => {
    try {
      const result = await ReservationDal.getDays();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error obtener los días" });
    }
  };
}

export default new ReservationController();
